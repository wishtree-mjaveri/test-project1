import React from 'react';
import {
  Table, Layout, Menu, Breadcrumb, Icon,Divider,Input,Modal,Form,Card,Upload,Button
} from 'antd';
import {
  Link,
} from 'react-router-dom';
import moment from 'moment';
import URL from '../environment/environment'
const {
  Header, Content, Sider, Footer,
} = Layout;
const confirm = Modal.confirm;

var that;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      editableRecord:'',
      fileList: [],
      imageData: '',
      profilePic: '',
    };
    this.edit = this.edit.bind(this);
    that=this;
  }
 state = {
    collapsed: false,
  };
componentWillMount(){
    fetch(URL.APIURL + "/getUserList", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
          .then((result) => {return result.json()})
          .then(
            (result) => {
              console.log(result)
              if (result.status == 200) {
                this.setState({
                  userList:result.data
                })         
              }
              else if (result.status === 300) {
                let responseMessage = (result.message).toString();
                console.log('responseMessage', responseMessage);
                message.error(result.message);
              }
              else if (result.status === 400) {
                this.props.history.push('/400.js');
                //bad request
              }
              else if (result.status === 429) {
                this.props.history.push('/verifyCaptcha');
                //Rate limit
              }
              else if (result.status === 404) {
                this.props.history.push('/notFound');
                //not found
              }
              else if (result.status === 422) {
                // server side validation error
                this.setState({
                  serverSideValidationError: result.message.errMsgs
                })
              } else if (result.status === 401) {
                // session expired
                window.location.replace('/signin');
              }
              else if (result.status === 403) {
                // request forbidden
                this.props.history.push('/requestForbidden');
              }
              else if (result.status === 500) {
                // server error
                this.props.history.push('/serverError');
              }
              else {
                message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
              }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
          )
}
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  showModal = (record) => {
    this.setState({
      visible: true,
      editableRecord:record
    });
  };

  handleOk = e => {
    console.log(e);
    console.log('in handle ok......');
      console.log(this.props.form.getFieldsValue());
      let values = this.props.form.getFieldsValue();
      console.log('in handle ok......values',values);
      this.state.editableRecord.name = values.name
      const userDetails = new FormData();

      userDetails.append('uid', this.state.editableRecord.uid);
      userDetails.append('name', this.state.editableRecord.name);
      // userDetails.append('file', this.state.imageData);
      userDetails.append('file', this.state.imageData.originFileObj);

      // call backend api updateUser
      fetch(URL.APIURL + "/editUser", {
          method: 'POST',
          credentials: 'include',
          body: userDetails
      })

    //call api to edit record
      /* fetch(URL.APIURL + "/editUser", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
         body: JSON.stringify({
           data:this.state.editableRecord
         }),
        credentials: 'include'
    }) */
        .then(result => result.json())
        .then(
            (result) => {
              console.log(result);
                if (result.status == 200) {
                    // for (let i = 0; i < result.response.length; i++) {
                    //     result.response[i].key = result.response[i].id
                    // }
                    if(result.data && result.data.profilePic){

                      var editableRecord = {...that.state.editableRecord}
                      editableRecord.profilePic= result.data.profilePic
                      this.setState({editableRecord})
                      console.log('profile pic 11 ',that.state.editableRecord.profilePic);

                      /* this.state.editableRecord.profilePic = result.data.profilePic
                      console.log('profile pic 22 ',this.state.editableRecord.profilePic); */

                      /* this.setState({ editableRecord: { ...this.state.editableRecord, profilePic: result.data.profilePic} });
                      console.log('profile pic 33',this.state.editableRecord.profilePic); */
                    }
                }
                else if (result.status === 300) {
                    let responseMessage = (result.message).toString();
                    console.log('responseMessage', responseMessage);
                    message.error(result.message != undefined &&
                        result.message != '' ? this.props.intl.formatMessage({ id: responseMessage, defaultMessage: Messages[responseMessage] }) :
                        this.props.intl.formatMessage({
                            id: 'noErrorMessageFromServerForResponseCode300',
                            defaultMessage: Messages.noErrorMessageFromServerForResponseCode300
                        }))
                }
                else if (result.status === 400) {
                    this.props.history.push('/400.js');
                    //bad request
                }
                else if (result.status === 404) {
                    this.props.history.push('/notFound');
                    //not found
                }
                else if (result.status === 429) {
                  this.props.history.push('/verifyCaptcha');
                  //Rate limit
                }
                else if (result.status === 422) {
                    // server side validation error
                    this.setState({
                        serverSideValidationError: result.message.errMsgs
                    })

                } else if (result.status === 401) {
                    // session expired
                    window.location.replace('/signin');
                }
                else if (result.status === 403) {
                    // request forbidden
                    this.props.history.push('/requestForbidden');

                }
                else if (result.status === 500) {
                    // server error
                    this.props.history.push('/serverError');

                }
                else {
                    message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
                }


            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {

            }
        )
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  edit(record){
    console.log('edit -------------------',record);
    this.showModal(record);
  }
  delete(record) {
    confirm({
      icon: <Icon type="delete" style={{ color: '#038fde' }} />,
      title: 'Delete User',
      content: 'Are you sure you want to delete the user?',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        fetch(URL.APIURL + "/deleteUser", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                id: record.uid
            }),
          })
            .then((result) => { return result.json(); })
            .then(
                (result) => {
                  console.log(result);
                    if (result.status == 200) {
                        let data = that.state.userList;
                        let removethis = [];
                        removethis.push(record.uid);
                        var result = data.filter(function (data) {
                            return !removethis.includes(data.uid);
                        })
                        that.setState({
                            userList: result
                        })
                    }
                    else if (result.status === 300) {
                        let responseMessage = (result.message).toString();
                        console.log('responseMessage', responseMessage);
                        message.error(result.message != undefined &&
                            result.message != '' ? this.props.intl.formatMessage({ id: responseMessage, defaultMessage: Messages[responseMessage] }) :
                            this.props.intl.formatMessage({
                                id: 'noErrorMessageFromServerForResponseCode300',
                                defaultMessage: Messages.noErrorMessageFromServerForResponseCode300
                            }))
                    }
                    else if (result.status === 400) {
                        this.props.history.push('/400.js');
                        //bad request
                    }
                    else if (result.status === 429) {
                      this.props.history.push('/verifyCaptcha');
                      //Rate limit
                    }
                    else if (result.status === 404) {
                        this.props.history.push('/notFound');
                        //not found
                    }
                    else if (result.status === 422) {
                        // server side validation error


                    } else if (result.status === 401) {
                        // session expired
                        window.location.replace('/signin');
                    }
                    else if (result.status === 403) {
                        // request forbidden
                        this.props.history.push('/requestForbidden');

                    }
                    else if (result.status === 500) {
                        // server error
                        this.props.history.push('/serverError');

                    }
                    else {
                        message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
                    }
                },
            );
    },
    onCancel() {
    },
    });


    }
    logout = () => {
        //alert('in logoyt');
        fetch(URL.APIURL + "/logout", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(result => {
                return result.json()
            })
            .then(
                (result) => {

                    if (result.status == 200) {
                        //
                    }

                    else if (result.status === 300) {
                        let responseMessage = (result.message).toString();
                        console.log('responseMessage', responseMessage);
                        message.error(result.message != undefined &&
                            result.message != '' ? this.props.intl.formatMessage({ id: responseMessage, defaultMessage: Messages[responseMessage] }) :
                            this.props.intl.formatMessage({
                                id: 'noErrorMessageFromServerForResponseCode300',
                                defaultMessage: Messages.noErrorMessageFromServerForResponseCode300
                            }))
                    }
                    else if (result.status === 400) {
                        this.props.history.push('/400.js');
                        //bad request
                    }
                    else if (result.status === 429) {
                      this.props.history.push('/verifyCaptcha');
                      //Rate limit
                    }
                    else if (result.status === 404) {
                        this.props.history.push('/notFound');
                        //not found
                    }
                    else if (result.status === 422) {
                        // server side validation error

                    } else if (result.status === 401) {
                        // session expired
                        window.location.replace('/signin');
                    }
                    else if (result.status === 403) {
                        // request forbidden
                        this.props.history.push('/requestForbidden');
                    }
                    else if (result.status === 500) {
                        // server error
                        this.props.history.push('/serverError');
                    }
                    else {
                        message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )
    }

  dummyRequest = ({ file, onSuccess }) => {
      this.setState({
          imageData: file,
      }, () => {
      });
      setTimeout(() => {
          onSuccess('ok');
      }, 0);
  };

  onFileUpload = (info) => {
    const { imageData } = this.state;
    const nextState = {};
    if (info.file !== undefined) {
        switch (info.file.status) {
            case 'uploading':
                nextState.profilePic = [info.file];
                break;
            case 'done':
                nextState.selectedFile = info.file;
                nextState.profilePic = [info.file];
                break;

            default:
                // error or removed
                nextState.selectedFile = null;
                nextState.profilePic = [];
        }
    }

    this.setState(() => { return nextState; });
    /* const Image = new FormData();

    Image.append('file', imageData);
    Image.append('name', 'abc.txt');

    fetch(`${URL.APIURL}/uploadProfilePic`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      credentials: 'include',
      body: Image,
    })
      .then((result) => { return result.json(); })
      .then((result) => {
            console.log(result);
            if (result.status === 200) {
                message.success(result.message);
            } else if (result.status === 300) {
                message.error(result.message);
            }
        },
      ); */
  };

  handleUploadChange = (info) => {
    console.log('info in handleUpdload chnage....');

    console.log(info);
    console.log(this.props);

    let fileList = [info.fileList.pop()];
    fileList.status = 'done';
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
        if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
        }
        return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
        if (file.response) {
            return file.response.status === 'success';
        }
        this.setState({ fileList, imageData: info.file, }, () => {
            console.log('fileList.............', fileList);
        });
        return true;
    });
};
onChange = (info) => {
    const { imageData, fileList } = this.state;
    const nextState = {};
    switch (info.file.status) {
        case 'uploading':
            nextState.profilePic = [info.file];
            break;
        case 'done':
            nextState.selectedFile = info.file;
            nextState.profilePic = [info.file];
            break;

        default:
            // error or removed
            nextState.selectedFile = null;
            nextState.profilePic = [];
    }
    this.setState(() => { return nextState; });
};
  render() {

    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
      
{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={ () => this.edit(record)}>Edit</a>
        <Divider type="vertical" />
        <a onClick={ () => this.delete(record)}>Delete</a>
      </span>
    ),
  },
    ];
        const { getFieldDecorator } = this.props.form;

            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };
        

    const today=new Date().toISOString();
  
    const props = {
      action: 'http://localhost:1337/',
      onChange: this.handleUploadChange,
      defaultFileList: [this.state.fileList.length > 0 ? this.state.imageData : this.state.editableRecord && this.state.editableRecord.profilePic],
    };

    return (
      <Layout>
         <Header style={{ background: '#fff', padding: 0 }}>
         
           <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {/* <Input className="mt10" placeholder="Search..." /> */}
            <span>Wishtree Technologies</span>
            <span className="floatRight pr50">{moment(new Date(today)).format('MMMM Do YYYY, h:mm:ss ')}</span>
          </Header>
          <Layout>
             <Sider width={200} style={{ background: '#fff' }}  collapsed={this.state.collapsed}>
              <Menu className='m0' theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item className='m0' key="1">
              <Icon type="user" style={{ fontSize: '20px' }} />
              <span>Datatable</span>
            </Menu.Item>
             <Menu.Item key="2">
              <Link onClick={this.logout} to="/signin">
                  <Icon type="logout" style={{ fontSize: '20px' }} />
                  <span>Logout</span>
              </Link>
             </Menu.Item>
          </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
             <Breadcrumb style={{ margin: '16px 18px' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Datatable</Breadcrumb.Item>
            </Breadcrumb>
          {/* <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              //minHeight: 280,
            }}
          > */}
       <Card title='Users'>
            <Table
            style={{ background: '#fff', padding: 24, minHeight: 280 }}
            dataSource={this.state.userList}
            columns={columns}
          />
         </Card>
        </Layout>
        </Layout>
        <Footer className="footerBackgroundColor" style={{'text-align': 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '60px' }}>copyright Wishtree Technologies</Footer>
        <Modal
          title="Edit Details"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* <p>{this.state.editableRecord.age}</p> */}
      
           <p className='height150px'><Form onSubmit={this.handleOk}>
             <Form.Item>
                    {getFieldDecorator('email', {
                       initialValue: this.state.editableRecord && this.state.editableRecord!= '' ? this.state.editableRecord.email : undefined,
                    })(<Input disabled  placeholder='Enter email'  />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('name', {
                       initialValue: this.state.editableRecord && this.state.editableRecord!= '' ? this.state.editableRecord.name : undefined,
                        // rules: [{
                        //      validator: this.customValidation,
                        //    }
                        // ],
                    })(<Input placeholder='Edit name' />)}
                </Form.Item>
                <Form.Item>
                        {getFieldDecorator('upload', {
                        })(
                            <Upload {...props} fileList={this.state.editableRecord && this.state.editableRecord.profilePic ? [this.state.editableRecord.profilePic] : []}>
                                <Button>
                                  <Icon type="upload" /> Upload Profile
                                </Button>
                            </Upload>
                        )}


                          {/* {getFieldDecorator('upload', {
                          })(
                              <Upload
                                  type="file"
                                  fileList={this.state.editableRecord && this.state.editableRecord.profilePic ? [this.state.editableRecord.profilePic] : []}
                                  customRequest={this.dummyRequest}
                                  onChange={this.onFileUpload}
                              >
                                  <Button>
                                    <Icon type="upload" /> Click to Upload 
                                  </Button>
                              </Upload>,
                          )} */}
                    </Form.Item>
            </Form></p>
        </Modal>
      </Layout>
    

    );
  }
}

const HomePageForm = Form.create({ name: 'register' })(HomePage);

export default HomePageForm; 