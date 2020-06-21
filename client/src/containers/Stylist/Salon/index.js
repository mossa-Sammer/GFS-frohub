import React, { Component } from 'react';
import { Button, Form, Input, Radio, Upload, Icon, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid/dist/v4';

import { getSignedUrl, uploadFiles } from './api';
import {
  Uploader,
  ZonesSelector,
  Address,
  OpeningTimes,
} from '../../../components';

import { STYLIST_SERVICES_URL } from '../../../routes_urls';
import {
  getSalonData as getSalonDataAction,
  addSalonData as addSalonDataAction,
  updateSalonData as updateSalonDataAction,
} from './salon.actions';

import './style.css';

class SalonForm extends Component {
  state = {
    fileList: [],
    openingTimesRef: React.createRef(),
    zonesRef: React.createRef(),
    profileImageRef: React.createRef(),
    coverImageRef: React.createRef(),
    loading: false,
    isMobile: false,
  };

  async componentDidMount() {
    const { getSalonDataAction: getSalonData } = this.props; // redux action creator
    getSalonData();
  }

  componentDidUpdate(prevProps) {
    const {
      form: { setFieldsValue },
    } = prevProps;
    const { salonData } = this.props;

    if (prevProps.salonData !== salonData) {
      const {
        salonData: { salon },
      } = this.props;

      const {
        name,
        about,
        instgram_handle: instgramHandle,
        type,
        document,
      } = salon;
      let newList = [...document];
      newList = newList.map(d => {
        return {
          uid: uuid(),
          name: d,
          url: d,
          status: 'done',
        };
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        fileList: newList,
        isMobile: type === 'mobile',
      });
      setFieldsValue({
        salonName: name,
        about,
        instgramHandle,
        type,
      });
    }
  }

  sliceDocName = name => name.substring(name.lastIndexOf('/') + 1);

  filterBlobs = blobs => blobs.map(b => b.originFileObj).filter(Boolean);

  filterFilesUrls = files =>
    files.filter(b => !b.originFileObj).map(f => f.url);

  getFilesTypes = files => files.map(f => f.type);

  normalizeTimes = times => {
    return times
      .filter(t => t.day && t.from_time && t.to_time)
      .map(t => {
        return {
          day: t.day,
          fromTime: t.from_time,
          toTime: t.to_time,
        };
      });
  };

  normalizeZones = zones => {
    zones
      .filter(zone => zone.from_zone && zone.to_zone && zone.price)
      .map(z => {
        return {
          fromZone: z.from_zone,
          toZone: z.to_zone,
          price: z.price,
        };
      });
  };

  handleSubmit = () => {
    const {
      props: { form: addressForm },
    } = this.addressComponent;

    const {
      form,
      history,
      loggedUser: { userId },
      salonData,
      addSalonDataAction: addSalonData,
      updateSalonDataAction: updateSalonData,
    } = this.props;

    const {
      openingTimesRef: {
        current: {
          state: { times },
        },
      },
      zonesRef: { current: zonesComponent },
      profileImageRef: {
        current: { state: profileImage },
      },
      coverImageRef: {
        current: { state: coverImage },
      },
      fileList,
    } = this.state;

    let zones;
    if (zonesComponent) {
      zones = zonesComponent.state.zones;
    }

    const documents = this.filterBlobs(fileList);
    const prevFiles = this.filterFilesUrls(fileList);

    form.validateFieldsAndScroll(async (err, salonDetails) => {
      if (!err) {
        addressForm.validateFieldsAndScroll(
          async (errAddress, addressDetails) => {
            if (!errAddress) {
              const normalizedZones = zones ? this.normalizeZones(zones) : [];
              const normalizedTimes = this.normalizeTimes(times);

              let blobsToUpload = [];
              let urlsToUPload = [];

              let profileImageUrl;
              let coverImageUrl;
              let documentUrls = [];

              if (profileImage.blob) {
                const { data } = await getSignedUrl(userId, [
                  profileImage.blob.type,
                ]);
                [profileImageUrl] = data.images;
                blobsToUpload.push(profileImage.blob);
                urlsToUPload.push(data.promises[0]);
              }

              if (coverImage.blob) {
                const { data } = await getSignedUrl(userId, [
                  coverImage.blob.type,
                ]);
                [coverImageUrl] = data.images;
                blobsToUpload.push(coverImage.blob);
                urlsToUPload.push(data.promises[0]);
              }

              if (documents.length) {
                const { data } = await getSignedUrl(
                  userId,
                  this.getFilesTypes(documents)
                );
                documentUrls = data.images;
                blobsToUpload = [...blobsToUpload, ...documents];
                urlsToUPload = [...urlsToUPload, ...data.promises];
              }

              await uploadFiles(urlsToUPload, blobsToUpload);

              const salon = {
                ...salonDetails,
                ...addressDetails,
                profileImage: profileImageUrl || profileImage.imageUrl,
                coverImage: coverImageUrl || coverImage.imageUrl,
              };

              salon.name = salon.salonName;
              salon.countryCode = salon.country;
              delete salon.salonName;
              delete salon.country;

              salon.document = [...documentUrls, ...prevFiles];

              if (salonData.salon) {
                updateSalonData(salonData.salon.salon_id, {
                  salon,
                  openingTimes: normalizedTimes,
                  zones: normalizedZones,
                });
              } else {
                addSalonData(userId, {
                  salon,
                  openingTimes: normalizedTimes,
                  zones: normalizedZones,
                });
              }
              history.push(STYLIST_SERVICES_URL);
            }
          }
        );
      }
    });
  };

  render() {
    const {
      fileList,
      openingTimesRef,
      zonesRef,
      profileImageRef,
      coverImageRef,
      loading,
      isMobile,
    } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const {
      salonData,
      salonData: { salon },
    } = this.props;

    let profileImage = '';
    let coverImage = '';

    let zones = [];
    let openingTimes = [];
    const address = {};

    if (salon) {
      profileImage = salon.profile_image;
      coverImage = salon.cover_image;

      zones = salonData.zones;
      openingTimes = salonData.openingTimes;

      address.country = salon.country;
      address.city = salon.city;
      address.street = salon.street;
      address.postalCode = salon.postal_code;
    }

    const antIcon = (
      <Icon
        className="salon__loading-spiner"
        type="loading"
        style={{ fontSize: 24 }}
        spin
      />
    );
    const spiner = <Spin indicator={antIcon} />;
    return (
      <div className="salon__page">
        {loading ? (
          spiner
        ) : (
          <>
            <h2>Salon Details</h2>
            <Form>
              <Form.Item className="salon-input" label="Salon name">
                {getFieldDecorator('salonName', {
                  rules: [
                    { required: true, message: 'Please enter salon name' },
                    { max: 30, message: 'salon name is too long' },
                  ],
                })(<Input />)}
              </Form.Item>

              <Form.Item
                className="instgram-handle-input"
                label="Instgram handle"
              >
                {getFieldDecorator('instgramHandle', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter instgram handle',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Salon Type">
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: 'Please specify the salon type',
                    },
                  ],
                })(
                  <Radio.Group
                    className="salon-page__salon-type"
                    onChange={({ target: { value } }) => {
                      this.setState({ isMobile: value === 'mobile' });
                    }}
                  >
                    <Radio value="salon">Salon based</Radio>
                    <Radio value="home">Home based</Radio>
                    <Radio value="mobile">Mobile based</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Form>
            <div className="address-section">
              <h4 className="address-section__header">What is your address?</h4>
              <Address
                address={address}
                wrappedComponentRef={form => {
                  this.addressComponent = form;
                }}
              />
            </div>
            {isMobile && (
              <ZonesSelector
                className="salon-zones"
                zones={zones.length !== 0 ? zones : [{ salon_zone_id: uuid() }]}
                handleAddMore={this.handleAddMoreZone}
                ref={zonesRef}
              />
            )}
            <h4>What Are your opening times?</h4>
            <OpeningTimes
              className="salon-opening-times"
              times={
                openingTimes?.length !== 0
                  ? openingTimes
                  : [{ salon_opening_time_id: uuid() }]
              }
              ref={openingTimesRef}
            />
            <Form>
              <Form.Item label="About me">
                {getFieldDecorator('about', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter salon description',
                    },
                    { max: 400, message: 'too long description' },
                  ],
                })(<Input.TextArea rows={4} />)}
              </Form.Item>
              <Form.Item className="profile-image__input" label="Profile image">
                <Uploader imgUrl={profileImage} ref={profileImageRef} />
              </Form.Item>
              <Form.Item label="Cover image">
                <Uploader imgUrl={coverImage} ref={coverImageRef} />
              </Form.Item>
            </Form>
            <div className="document-upload__wrapper">
              <p className="document-upload__text">
                if you have any formal qualifications as Hairstylist/Beautian,
                please upload them here
              </p>
              <Upload
                className="document-upload__uploader"
                name="document"
                listType="text"
                fileList={fileList}
                // eslint-disable-next-line no-unused-vars
                customRequest={({ _file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
                onChange={info => {
                  this.setState({
                    fileList: info.fileList,
                  });
                }}
              >
                <Button>
                  <Icon type="upload" /> Click to upload a document
                </Button>
              </Upload>
            </div>
            <Button
              type="primary"
              className="salon__btn"
              onClick={this.handleSubmit}
            >
              Save and Next
            </Button>
          </>
        )}
      </div>
    );
  }
}

const wrappedForm = Form.create({})(SalonForm);

const mapStateToProps = ({ salonData, login: { loggedUser } }) => {
  return { salonData, loggedUser };
};

const mapDispatchToProps = {
  getSalonDataAction,
  addSalonDataAction,
  updateSalonDataAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(wrappedForm));
