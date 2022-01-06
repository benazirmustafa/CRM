import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_jobcard_details,create_number } from "../../../actions/crm";
import MainLayout from "../../Layout/MainLayout";
import "../../App.css" 
import moment from 'dayjs';
import { Button } from 'antd';

export class CreateInvoice extends Component {
    
    componentDidMount(){
                  
        if(this.props.match.params.id){
            this.props.get_jobcard_details(this.props.match.params.id)
        }
    }
    getPrint=()=>{
        var divName="printArea"
        // console.log( document.getElementById(divName).innerHTML)
        // var printContents = document.getElementById(divName).innerHTML;
        // var originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.open();
        // window.print();
        // window.close();
        // document.body.innerHTML = originalContents;
        var w = window.open();
        w.document.write(document.getElementById(divName).innerHTML);
        w.print();
        w.close();
    }
    
    create_number(){
        this.props.create_number(this.props.match.params.id,"invoice")
    }
    
    render() {
        if(!this.props.jobcard_details){
            return null
        }
        console.log(this.props.jobcard_details,'this.props.jobcard_details')
        return (
            <MainLayout Propstyle="white">
            <br />
            <div >
                <div className="box wide hidden-on-narrow">
                {/* <div className="box-col">
                    <button className="export-pdf k-button" onClick="getPDF('.pdf-page')">Export</button>
                </div> */}
                <div className="box-col">
                    <Button className="export-pdf k-button" onClick={this.getPrint}>Print</Button>
                    {!this.props.jobcard_details.jobCardDetails.invoice_number?
                    <Button className="export-pdf k-button" onClick={()=>this.create_number()}>Generate Invoice Number</Button>
                        :null
                    }
                </div>    
                </div>
                <div className="page-container hidden-on-narrow" id="printArea">
                    <div className="pdf-page size-a4" style={{  width: '8.3in',   
                                                                margin: '0 auto',
                                                                boxSizing: 'border-box',
                                                                boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.3)',
                                                                color: '#333',
                                                                position: 'relative',
                                                                backgroundSize: 'contain'
                                                                }}>
                        <div className="pdf-header" style={{position: 'absolute',
                                                            top: '0.5in',
                                                            height: '0.6in',
                                                            left: '0.5in',
                                                            right: '0.5in',
                                                            borderBottom: '1px solid #e5e5e5'}}>
                        <span className="invoice-number">Invoice</span>
                        </div>
                    {/* <div className="pdf-footer">
                    <p>Blauer See Delikatessen<br />
                        Lutzowplatz 456<br />
                        Berlin, Germany,  10785
                    </p>
                    </div> */}
                    <div className="for" style={{ position: 'absolute',
                                                    top: '1.5in',
                                                    left: '0.5in',
                                                    width: '2.5in'}}>
                    <h3>Customer</h3>
                    <p>{this.props.jobcard_details.jobCardDetails.customer_name}<br />
                        {this.props.jobcard_details.jobCardDetails.customer_address}
                    </p>
                    </div>
                    <div className="from" style={{ position: 'absolute',
                                                    top: '1.5in',
                                                    right: '0.5in',
                                                    width: '2.5in'}}>
                    <p style={{paddingTop: '20px'}}>
                        Invoice No.: {this.props.jobcard_details.jobCardDetails.invoice_number}<br />
                        Invoice Date: {moment().format("DD-MMM-YYYY")}<br />
                        {/* P. Order: <br /> */}
                        Delivery Date: {moment().format("DD-MMM-YYYY")}<br />
                    </p>
                    </div>
                    <div className="pdf-body" style={{ position: 'absolute',
                                                        top: '3.7in',
                                                        bottom: '1.2in',
                                                        left: '0.5in',
                                                        right: '0.5in'}}>
                        <table style={{fontFamily: 'arial, sans-serif',
                                        borderCollapse: 'collapse',
                                        width: '100%'}}>
                        <tr>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Item</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Product</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Description</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Unit</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Rate</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Quantity</th>
                            <th style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>Amount</th>
                        </tr>
                        {this.props.jobcard_details.jobCardItems.map((data,i)=>
                            (
                            <tr key={i}>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{(i+1)}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.product}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.details}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.unit}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.unit_price}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.quantity}</td>
                                <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{data.amount}</td>
                            </tr>
                            )
                        )}
                        <tr>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}} colSpan={6}>Total Amount</td>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{this.props.jobcard_details.jobCardDetails.total_amount}</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}} colSpan={6}>Advance</td>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{this.props.jobcard_details.jobCardDetails.advance}</td>
                        </tr>
                        <tr>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}} colSpan={6}>Due</td>
                            <td style={{border: '1px solid #dddddd',padding: '8px',textAlign: 'left'}}>{this.props.jobcard_details.jobCardDetails.due}</td>
                        </tr>
                        </table>
                    </div>
                </div>
            </div>
          </div>
          </MainLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    jobcard_details: state.crm.jobcard_details
});

export default connect(mapStateToProps, {
    get_jobcard_details,
    create_number
})(CreateInvoice);

