import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Table, Tooltip, Layout, message,Pagination,PaginationProps ,TablePaginationConfig,Popconfirm,Spin} from "antd";
import Icon from "@ant-design/icons";
import AddRestaurant from "./AddRestaurant";
import Modal from "antd/lib/modal/Modal";
import EditRestaurant from "./EditRestaurant";
import { Link } from "react-router-dom";
import Axios from "axios";
import { EditTwoTone, DeleteTwoTone ,ArrowDownOutlined,ArrowUpOutlined} from "@ant-design/icons";
import { footerText } from "../../util/config";
import './index.css'
import { refresh } from "less";
import DeleteModal from "./DeleteModal";

const pleaseLogin = () => {
  message.error("Session expired please login");
};
const successfulDelete = () => {
  message.success("Restaurant Deleted");
};
const headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
function Home(props) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState()
  const [current, setCurrent] = useState(1)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sortorder, setSortorder] = useState('ASC')
  const TablePaginationConfig={
 showSizeChanger: false,
            showQuickJumper: false,
                         
           defaultPageSize:4,
           
            total: total,
            onChange: (e) => handleChange(e),
  }



  useEffect( () => {
    Axios.get(`http://localhost:1337/api/admin/restaurants?page=${page}&order=${sortorder}`,{withCredentials:true}).then((res) => {
      
    console.log(res.data);
    if(res.data.status==401){
     props.history.push("/userHome");
      pleaseLogin();
    }
    setRestaurantList(res.data.list);
      setLoading(false)
      Axios.get(`http://localhost:1337/api/card/restaurants`).then(res=>{console.log(res.data.list.length) ,setTotal(Math.ceil(res.data.list.length/4))  })
    }).catch(error=>console.log(error)
      );
  }, [page,total,sortorder]);



  const refreshData = async() => {
   await Axios.get(`http://localhost:1337/api/restaurants?page=${page}&order=${sortorder}`).then((res) => {
      console.log(res.data.list);
      setRestaurantList(res.data.list);
      Axios.get(`http://localhost:1337/api/card/restaurants`).then(res=>{console.log(res.data.list.length) ,setTotal(Math.ceil(res.data.list.length/4))  })
      setLoading(false)
    });
  };
  const { Footer } = Layout;

  function handleDelete(id) {
    console.log('uid:-',id)
    Axios.delete(`http://localhost:1337/api/restaurant?uid=${id}`,{
      headers: headers,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);

        if (res.data.status == 300 && res.data.message == "Please Login") {
          props.history.push("/userHome");
          pleaseLogin();
        } 
        if (res.data.status == 401 && res.data.message == "Please login") {
          history.push("/userHome");
          pleaseLogin();
        }else {
          refreshData();
          successfulDelete();
        }
      })
      .catch((error) => console.log(error));
  }
   function sortMethod(sortorder){
    if (sortorder=='ASC') {
      setSortorder('DESC')
    } else {
      setSortorder('ASC')
    }
  }
  const columns = [
    {
      title:<span>Restaurant Name <Tooltip title={"Ascending Order"} placement={"topLeft"} > <ArrowUpOutlined onClick={()=>setSortorder("ASC")}/></Tooltip> <Tooltip title={"Descending Order"} placement={"topLeft"} > <ArrowDownOutlined onClick={()=>setSortorder("DESC")} /> </Tooltip> </span>,
       
      dataIndex: "restaurantName",
      key: "name",
      width: "25%",
      ellipsis:{
        showTitle:false
      },
     
     
      
      // sorter:{handleChange},
    

      render: (text, record) => (
        <span className="gx-link">
          <Tooltip placement={"topLeft"} title={text}>
          <Link
            to={{ pathname: `/restaurantdetails/${record.uid}`, restaurantId: record.id }}
          >
            {text}
          </Link>
          </Tooltip>
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "restaurantDescription",
      key: "age",
      ellipsis: {
        showTitle: false,
      },

      render: (restaurantDescription) => (
        <Tooltip placement={"topLeft"} title={restaurantDescription}>
          {restaurantDescription.charAt(0).toUpperCase()+restaurantDescription.slice(1)}
        </Tooltip>
      ),
      width: "30%",
    },
    {
      title: "Address",
      dataIndex: "restaurantAddress",
      key: "address",
      ellipsis: {
        showTitle: false,
      },
      width: "30%",
      render: (restaurantAddress) => (
        <Tooltip placement={"topLeft"} title={restaurantAddress}>
          {restaurantAddress=restaurantAddress!=''?restaurantAddress.charAt(0).toUpperCase()+restaurantAddress.slice(1):"N/A"}
        </Tooltip>
      ),
    },
    {
      title: "Opening Time",
      dataIndex: "restaurantOpeningTime",
      key: "time",
      width: "15%",
    },
    {
      title: "Closing Time",
      dataIndex: "restaurantClosingTime",
      key: "time",
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => ( 
        <div style={{ display: "inline-flex" }}>
        
          <EditRestaurant
          
            name={record.restaurantName}
            id={record.id}
            desc={record.restaurantDescription}
            address={record.restaurantAddress}
            openingTime={record.restaurantOpeningTime}
            closingTime={record.restaurantClosingTime}
            image={record.image}
            refresh={refreshData}
          />
       
          <Divider type="vertical" />
         <DeleteModal uid={record.uid} handleDelete={handleDelete} pleaseLogin={pleaseLogin} refreshData={refreshData}/>

          {/* <Divider type="vertical"/> */}
          {/* <span className="gx-link ant-dropdown-link">
              More actions <Icon type="down"/>
            </span> */}
        </div>
      ),
      width: "15%",
    },
  ];
  const style = {
    padding: "50px 40px 70px 100px",
    textAlign: "center",
    background: " #036",
    color: "white",
    fontSize: "30px",
  };

  const handleLogout = () => {
    Axios.post(
      "http://localhost:1337/user/logout",
      { headers: headers },
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res.data);

        props.history.push("/userHome");
      })
      .catch((error) => console.log(error));
  };
const handleChange=(e)=>{
  setPage(e)
  // Axios.get(`http://localhost:1337/api/restaurants?page=${page}`).then((res) => {
  //     console.log(res.data.list);
  //     setRestaurantList(res.data.list);
  //   });
  // setSortorder(e)
console.log(sortorder)
  // refreshData()


}
  return (
    <div>
      <header style={style}>
        <Link
          to="/"
          className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
        >
          <h1
            style={{
              float: "left",
              color: "white",
              fontFamily: "Paytone One, sans-serif",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Zonions
          </h1>
        </Link>
        <Tooltip title={"Logout"} placement={"topLeft"}>
        <Button onClick={handleLogout} style={{ float: "right" }}>

          Logout
        </Button>
        </Tooltip>
      </header>
      <div style={{ padding: 80 }}>
        <Card bordered={true}>
<Spin spinning={loading} >

          <header>
            <h1 style={{ float: "left" }}>Admin Home</h1>
            <div style={{ float: "right" }}>
             
              <AddRestaurant refresh={refreshData} />{" "}
            </div>
          </header>
          <Table
            className="gx-table-responsive"
            columns={columns}
            dataSource={restaurantList}
            // pagination={{
            //   defaultPageSize:4,
            //   total:{total},
            //   change:{handleChange}
            // }}
            pagination={false}
            showSorterTooltip={false}
          />
         <Pagination style={{float:'right',paddingTop:'20px'}}  defaultPageSize={page} defaultCurrent={current} total={total} onChange={handleChange} />
       </Spin>
        </Card>
     
      </div>
     
      <Footer style={{ background: " #036" ,position: 'absolute' ,
    bottom: '0' ,
    width: '100%',
    height: '2.5rem',}}>
        <div style={{ textAlign: "left", color: "white" }}>{footerText}</div>
      </Footer>
    </div>
  );
}

export default Home;
