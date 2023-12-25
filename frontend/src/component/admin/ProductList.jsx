import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,getAdminProduct, deleteProduct} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { MdEdit, MdDelete } from "react-icons/md";
import SideBar from "./Sidebar.jsx";
import { DELETE_PRODUCT_RESET } from "../../constants/productContants";
import { useNavigate } from "react-router-dom";

const ProductList =()=>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate= useNavigate();

    const {error, products} = useSelector((state)=>state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
      );

    const deleteProductHandler = (id) => { // to delete the added product from the list
        dispatch(deleteProduct(id));
      };
    

    useEffect(()=>{
        if(error){
                alert.error(error);
                dispatch(clearErrors());
            }
            if (deleteError) {
                alert.error(deleteError);
                dispatch(clearErrors());
              }
              if (isDeleted) {
                alert.success("Product Deleted Successfully");
                navigate("/admin/dashboard");
                dispatch({ type: DELETE_PRODUCT_RESET });
              }

        dispatch(getAdminProduct());
        },[dispatch,alert,error,deleteError,isDeleted]);


    const columns = [
        {field:"id", headerName:"Product ID", minWidth:200 , flex:0.5},
        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:1,
        },
        {
            field:"stock",
            headerName:"Stock",
            type:"number",
            minWidth:150,
            flex:0.3,
        },
        {
            field:"price",
            headerName:"Price",
            type:"number",
            minWidth:270,
            flex:0.5,
        },
        {
            field:"actions",
            headerName:"Actions",
            type:"number",
            minWidth:150,
            flex:0.3,
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <MdEdit />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows =[];
    products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });


    return(
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
            </div>
        </Fragment>
    );
};

export default ProductList; 