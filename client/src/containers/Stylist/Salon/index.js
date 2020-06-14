import React, { Component } from 'react';
import { Button, Form, Input, Radio, Upload, Icon, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

      const { name, about, instgram_handle: instgramHandle, type } = salon;

      setFieldsValue({
        salonName: name,
        about,
        instgramHandle,
        type,
      });
      // eslint-disable-next-line react/no-did-update-set-state
    }
  }

  handleSubmit = () => {
    this.setState({ loading: true });
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
      zonesRef: {
        current: {
          state: { zones },
        },
      },
      profileImageRef: {
        current: { state: profileImage },
      },
      coverImageRef: {
        current: { state: coverImage },
      },
      fileList,
    } = this.state;

    const document = fileList[0]?.originFileObj;

    form.validateFieldsAndScroll(async (err, salonDetails) => {
      if (!err) {
        addressForm.validateFieldsAndScroll(
          async (errAddress, addressDetails) => {
            if (!errAddress) {
              const blobsToUpload = [];
              const urlsToUPload = [];

              let profileImageUrl;
              let coverImageUrl;
              let documentUrl;

              if (profileImage.blob) {
                const { data } = await getSignedUrl(
                  userId,
                  profileImage.blob.type
                );
                [profileImageUrl] = data.images;
                blobsToUpload.push(profileImage.blob);
                urlsToUPload.push(data.promises[0]);
              }

              if (coverImage.blob) {
                const { data } = await getSignedUrl(
                  userId,
                  coverImage.blob.type
                );
                [coverImageUrl] = data.images;
                blobsToUpload.push(coverImage.blob);
                urlsToUPload.push(data.promises[0]);
              }

              if (document) {
                const { data } = await getSignedUrl(userId, document.type);
                [documentUrl] = data.images;
                blobsToUpload.push(document);
                urlsToUPload.push(data.promises[0]);
              }

              await uploadFiles(urlsToUPload, blobsToUpload);

              const normalizedZones = zones.map(zone => {
                return {
                  fromZone: zone.from_zone,
                  toZone: zone.to_zone,
                  price: zone.price,
                };
              });
              const normalizedTimes = times.map(time => {
                return {
                  day: time.day,
                  fromTime: time.from_time,
                  toTime: time.to_time,
                };
              });

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
              if (document) salon.document = documentUrl;
              else salon.document = salonData.salon.document;

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

  sliceDocName = name => name.substring(name.lastIndexOf('/') + 1);

  render() {
    const {
      fileList,
      openingTimesRef,
      zonesRef,
      profileImageRef,
      coverImageRef,
      loading,
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
    const document = [];

    let zones = [];
    let openingTimes = [];
    const address = {};

    if (salon) {
      profileImage = salon.profile_image;
      coverImage = salon.cover_image;
      const docName = this.sliceDocName(salon.document);
      document.push({
        uid: '1',
        name: docName,
        url: salon.document,
        status: 'done',
      });

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
            <h3>Salon Details</h3>
            <Form>
              <Form.Item className="salon-input" label="Salon name">
                {getFieldDecorator('salonName', {
                  rules: [
                    { required: true, message: 'Please enter salon name' },
                    { max: 30, message: 'salon name is too long' },
                  ],
                })(<Input />)}
              </Form.Item>
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
                  <Radio.Group className="salon-page__salon-type">
                    <Radio value="salon">Salon based</Radio>
                    <Radio value="home">Home based</Radio>
                    <Radio value="mobile">Mobile based</Radio>
                  </Radio.Group>
                )}
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
                fileList={fileList.length === 0 ? document : fileList}
                // eslint-disable-next-line no-unused-vars
                customRequest={({ _file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
                onChange={info => {
                  let clonedList = [...info.fileList];
                  clonedList = clonedList.slice(-1);
                  this.setState({
                    fileList: clonedList,
                  });
                }}
              >
                <Button>
                  <Icon type="upload" /> Click to upload a document
                </Button>
              </Upload>
              <ZonesSelector
                zones={zones || []}
                handleAddMore={this.handleAddMoreZone}
                ref={zonesRef}
              />
              <div className="address-section">
                <h4 className="address-section__header">
                  What is your address?
                </h4>
                <Address
                  address={address}
                  wrappedComponentRef={form => {
                    this.addressComponent = form;
                  }}
                />
              </div>
              <h4>What Are your opening times?</h4>
              <OpeningTimes times={openingTimes || []} ref={openingTimesRef} />
            </div>
            <Button
              type="primary"
              className="salon__btn"
              onClick={this.handleSubmit}
            >
              Save & Next
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
