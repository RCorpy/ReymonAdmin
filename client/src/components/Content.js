import React from "react";
import Card from "./contentComponents/Card"

export default function Content({title}) {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{title}</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card
                title="Big card"
                >
                  BIG BOY CARD
                </Card>
            </div>
            <div className="col-lg-6">
              <Card 
                title="Online Store Visitors" 
                headerButtons={[{text: "View MA report"}, {icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                  Card Body, need tables urgent
              </Card>
              {/* /.card */}
              <Card 
                title="Products" 
                headerButtons={[{icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                  Card Body, need tables urgent
              </Card>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}
            <div className="col-lg-6">
              <Card 
                title="Sales" 
                headerButtons={[{text:"View Report"}]}
                >
                  Card Body, need tables urgent
              </Card>
              {/* /.card */}
              <Card 
                title="Online Store Overview" 
                headerButtons={[{icon:"fas fa-download", href: "##"}, {icon:"fas fa-bars"}]}
                >
                  Card Body, need tables urgent
              </Card>
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
    </div>
  );
}
