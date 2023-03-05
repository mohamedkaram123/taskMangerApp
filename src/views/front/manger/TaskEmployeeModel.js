import { Button, Modal } from "react-bootstrap";
import React, { useState,useEffect,useRef } from "react";
import TaskCard from "./TaskCard";
import NotFoundData from "../NotFoundData";

export default function TaskEmployeeModel({show,handleClose,items}) {

return (
      <div className="mt-40">

        <Modal show={show} size="l" onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>{"Tasks Employee"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="h-md-80 h-60 overflow-y-scroll">
                 {items.length > 0? items.map((item,i)=> <TaskCard key={i} item={item} />):
                 <NotFoundData  message={'Not Found Data'} />}
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row">

                  <Button variant="secondary" onClick={handleClose}>
                    {"Close"}
                  </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
