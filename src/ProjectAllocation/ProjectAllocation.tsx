import SideBar from "../SideBar/SideBar";
import { Modal, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import Table from "../DataTable/DataTable";
import { MultiSelect } from "react-multi-select-component";
import "./ProjectAllocation.css";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { projectAllocationActions } from "../Store/Slices/ProjectAllocation";
import { employeeActions } from "../Store/Slices/Employee";

const columns = [
  {
    name: "Resource",
    selector: (row: { resourceName: any }) => row.resourceName,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Type",
    selector: (row: { resourceType: any }) => row.resourceType,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Role",
    selector: (row: { role: any }) => row.role,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Supervisor",
    selector: (row: { manager: any }) => row.manager,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  // {
  //   name: "Year",
  //   selector: (row: { year: any }) => row.year,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  // {
  //   name: "Month",
  //   selector: (row: { month: any }) => row.month,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  {
    name: "PTO Days",
    selector: (row: { pTODays: any }) => row.pTODays,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  // {
  //   name: "Resource Type1",
  //   selector: (row: { resourceType1: any }) => row.resourceType1,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  {
    name: "Location",
    selector: (row: { location: any }) => row.location,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  {
    name: "Resource Market",
    selector: (row: { resourceMarket: any }) => row.resourceMarket,
    sortable: true,
    reorder: true,
    filterable: true,
  },
  // {
  //   name: "Project Market",
  //   selector: (row: { projectMarket: any }) => row.projectMarket,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  // {
  //   name: "PPSID",
  //   selector: (row: { ppsid: any }) => row.ppsid,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  // {
  //   name: "Expense Type",
  //   selector: (row: { capex: any }) => row.capex,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },
  // {
  //   name: "Projects",
  //   selector: (row: { projects: any }) => row.projects,
  //   sortable: true,
  //   reorder: true,
  //   filterable: true,
  // },

  {
    name: "Allocation(Hours)",
    selector: (row: { allocationHours: any }) => row.allocationHours,
    sortable: true,
    reorder: true,
    filterable: true,
  },
];

const data = [
  {
    id: 1,
    resource: "Bibek Khatiwada",
    resourceType: "GTM",
    role: "Developer",
    supervisor: "Vipul Suri",
    year: "2020",
    month: "NOV",
    ptoDays: "1",
    resourceType1: "Developer",
    location: "US",
    resourceMarket: "CA",
    projectMarket: "CA",
    ppsid: "*A123",
    capex: "CAPEX",
    projects: "Region Provider Portal",

    allocationHours: "17.6",
  },
  {
    id: 2,
    resource: "Ajay Singh",
    resourceType: "OGS",
    role: "Developer",
    supervisor: "Ashish Khare",
    year: "2020",
    month: "APR",
    ptoDays: "0",
    resourceType1: "Developer",
    location: "India",
    resourceMarket: "CA",
    projectMarket: "CA",
    ppsid: "A2220",
    capex: "CAPEX",
    projects: "CA – Claims Quality Management – Phase 3",
    allocationHours: "36",
  },
  {
    id: 3,
    resource: "Mohan Ganesh,D",
    resourceType: "OGS",
    role: "Technical Analyst",
    supervisor: "Ashish Khare",
    year: "2020",
    month: "FEB",
    ptoDays: "0",
    resourceType1: "Technical Analyst",
    location: "India",
    resourceMarket: "CA",
    projectMarket: "NA",
    ppsid: "E0689",
    capex: "OPEX",
    projects: "Data Fabric RFP",
    allocationHours: "16",
  },
  {
    id: 4,
    resource: "Sivaruban Vinesparamoorthy",
    resourceType: "FTE",
    role: "QA",
    supervisor: "Vipul Suri",
    year: "2020",
    month: "MAY",
    ptoDays: "2",
    resourceType1: "QA",
    location: "India",
    resourceMarket: "NA",
    projectMarket: "NA",
    ppsid: "A2329",
    capex: "CAPEX",
    projects: "IWS",
    allocationHours: "100",
  },
];

const customValueRenderer = (selected: any, _options: any) => {
  if (selected.length == "0") return "Select";
  else return selected.map((market: any) => market.label).join(", ");
};

const ProjectAllocation = () => {
  const resourceMarkets = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];

  const resourceTypes = [
    { label: "OGS", value: "OGS" },
    { label: "GTM", value: "GTM" },
    { label: "FTE", value: "FTE" },
  ];

  const roles = [
    { label: "Developer", value: "Developer" },
    { label: "Dev Manager", value: "Dev Manager" },
    { label: "QA", value: "QA" },
    { label: "QA Manager", value: "QA Manager" },
    { label: "Sr. Developer", value: "Sr. Developer" },
    { label: "Sr. QA", value: "Sr. QA" },
    { label: "Technical Lead", value: "Technical Lead" },
 
  ];

  const projectMarkets = [
    { label: "AppleCare", value: "AppleCare" },
    { label: "Beaver", value: "Beaver" },
    { label: "CA", value: "CA" },
    { label: "HCP", value: "HCP" },
    { label: "Monarch", value: "Monarch" },
    { label: "NAMM", value: "NAMM" },
  ];

  const expenseTypes = [
    { label: "CAPEX", value: "CAPEX" },
    { label: "OPEX", value: "OPEX" },
  ];

  const dispatch = useDispatch();
  const toggle = useSelector((store: any) => store.ProjectAllocation.toggle);
  const projectAllocations = useSelector((store: any) => store.ProjectAllocation.data);
  const resourceMarketSelected= useSelector((store: any) => store.ProjectAllocation.resourceMarket)
  const resourceTypeSelected= useSelector((store: any) => store.ProjectAllocation.resourceType)
  const roleSelected= useSelector((store: any) => store.ProjectAllocation.role)
  const projectMarketSelected= useSelector((store: any) => store.ProjectAllocation.projectMarket)
  const expenseTypeSelected= useSelector((store: any) => store.ProjectAllocation.expenseType)
  const locationSelected=useSelector((store: any) => store.ProjectAllocation.location)
  const changeResourceMarketSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeResourceMarket(event));
  };
  const changeResourceTypeSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeResourceType(event));
   
  };
  const changeRoleSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeRole(event));
   
  };

  const changeProjectMarketSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeProjectMarket(event));
   
  };
  const changeExpenseTypeSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeExpenseType(event));

  };
  const changeLocationSelectHandler = (event: any) => {
    dispatch(projectAllocationActions.changeLocation(event));

  };

  const getProjectAllocationDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/ProjectAllocations/GetAllProjectAllocations ");
    const data = await response.json();
    console.log(data);
    dispatch(projectAllocationActions.changeData(data));
  };
  useEffect(() => {
    getProjectAllocationDetails();
  }, [toggle]);
  return (
    <div>
      <SideBar></SideBar>
      <div className="col-md-12 bg-mainclass">
        <div>
          <div className="row Page-Heading">
            <h1 className="Heading-Cls">Project Allocation</h1>
            <div className="btns project-allocation">
              {/* <button type="button" className="btn btn-primary upload-button-btn" style={{ marginRight: "200px" }}>
                <i className="las la-file-upload"></i>
              </button>
              <input
                type="file"
                className="btn btn-primary custom-file-input upload-input-btn"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ marginRight: "200px" }}
              /> */}
              <ModalDialog />
            </div>
          </div>
        </div>
        <div className="row filter-row">
          <div className="col-md-2 form-group">
            <label htmlFor="" className="form-label">
              Resource Market
            </label>
            <MultiSelect
              options={resourceMarkets}
              value={resourceMarketSelected}
              onChange={changeResourceMarketSelectHandler}
              labelledBy="Select Resource Market"
              valueRenderer={customValueRenderer}
            />
          </div>
          <div className="col-md-2 form-group">
            <label htmlFor="" className="form-label">
              Resource Type
            </label>
            <MultiSelect
              options={resourceTypes}
              value={resourceTypeSelected}
              onChange={changeResourceTypeSelectHandler}
              labelledBy="Select Resource Type"
              valueRenderer={customValueRenderer}
            />
          </div>

          <div className="col-md-2 form-group">
            <label htmlFor="" className="form-label">
              Role
            </label>
            <MultiSelect
              options={roles}
              value={roleSelected}
              onChange={changeRoleSelectHandler}
              labelledBy="Select Role"
              valueRenderer={customValueRenderer}
            />
          </div>
          <div className="col-md-2 form-group">
            <label htmlFor="" className="form-label">
              Project Market
            </label>
            <MultiSelect
              options={projectMarkets}
              value={projectMarketSelected}
              onChange={changeProjectMarketSelectHandler}
              labelledBy="Select Project Market"
              valueRenderer={customValueRenderer}
            />
          </div>

          <div className="col-md-2 form-group">
            <label htmlFor="" className="form-label">
              Expense Type
            </label>
            <MultiSelect
              options={expenseTypes}
              value={expenseTypeSelected}
              onChange={changeExpenseTypeSelectHandler}
              labelledBy="Select Expense Type"
              valueRenderer={customValueRenderer}
            />
          </div>
          <div className=" col-md-2 form-group">
            <label htmlFor="locationDropdown" className="form-label">
              Location
            </label>
            <div className="dropdown">
              <select className="form-control" value={locationSelected} onChange={changeLocationSelectHandler} id="locationDropdown">
                <option value="0">Select</option>
                <option value="1">US</option>
                <option value="2">India</option>
              </select>
            </div>
          </div>
        </div>

        <Table columns={columns} data={projectAllocations} />
        {/* <Table columns={columns} data={data} /> */}

      </div>
    </div>
  );
};

const ModalDialog = () => {
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  function closeModal() {
    return invokeModal(false);
  }
  const [allocationStartDate, setAllocationStartDate] = useState(new Date());
  const [allocationEndDate, setAllocationEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const [ptoDays, setPTODays] = useState("");
  const [allocationPercentage, setAllocationPercentage] = useState("");
  const [resourceType1, setResourceType1] = useState("0");
  const [resourceId, setResourceId] = useState("0");
  const [project, setProject] = useState("0");

  const resourceDetails = [
    {
      resource: "",
      resourceType: "",
      role: "",
      supervisor: "",
    },
    {
      resource: "Brahamananda Kanaparthi",
      resourceType: "GTM",
      role: "Developer",
      supervisor: "Vipul Suri",
    },
    {
      resource: "Kiran Singh",
      resourceType: "OGS",
      role: "Developer",
      supervisor: "Ashish Khare",
    },
    {
      resource: " Pravishtha Jain",
      resourceType: "OGS",
      role: "QA",
      supervisor: "Ashish Khare",
    },
    {
      resource: "Shriyans Sharma",
      resourceType: "OGS",
      role: "QA",
      supervisor: "Ashish Khare",
    },
  ];
  const projectDetails = [
    {
      project: "",
      location: "",
      resourceMarket: "",
      projectMarket: "",
      PPSID: "",
      CAPEX: "",
    },
    {
      project: "LHCP CA Region - Windows Server 2008/2008R2 Upgrade",
      location: "India",
      resourceMarket: "HCP",
      projectMarket: "FL",
      PPSID: "*A122",
      CAPEX: "CAPEX",
    },
    {
      project: "NAMM Thycotic Privilege Access Management (PAM)",
      location: "India",
      resourceMarket: "Beaver",
      projectMarket: "NA",
      PPSID: "A2293",
      CAPEX: "OPEX",
    },
    {
      project: "Regional CIRC Implementation",
      location: "India",
      resourceMarket: "AppleCare",
      projectMarket: "NA",
      PPSID: "A2220",
      CAPEX: "CAPEX",
    },
    {
      project: "SMS Manager",
      location: "US",
      resourceMarket: "NAMM",
      projectMarket: "CA",
      PPSID: "A226",
      CAPEX: "CAPEX",
    },
  ];
  let allocationHours = Math.ceil((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000*3600*24)-Number(ptoDays))*(8.5*Number(allocationPercentage))/100;
  const dispatch = useDispatch();
  const resourcesList = useSelector((store: any) => store.Employee.data);
  const getEmployeeDetails = async () => {
    const response = await fetch("https://localhost:44314/api/v1/Resources/GetAllResources");
    const data = await response.json();
    console.log(data);
    dispatch(employeeActions.changeData(data));
  };
  useEffect(() => {
    getEmployeeDetails();
  }, []);
  let selectedResourceDetails ={resourceId :0, resourceType:"",role : "",supervisor :"",location:"",resourceMarket:""};
  let selectedProjectDetails = projectDetails[Number(project)];
  const setResourceDetails = (event: any) => {
    console.log(selectedResourceDetails,event.target.value)
    setResourceId(event.target.value);
  };
  const setProjectDetails = (event: any) => {
    console.log(selectedProjectDetails);

    selectedProjectDetails = projectDetails[event.target.value];
    console.log(selectedProjectDetails);
    setProject(event.target.value);
  };

  

  if(resourceId=="0"){
    selectedResourceDetails ={resourceId :0, resourceType:"",role : "",supervisor :"",location:"",resourceMarket:""};
  }
  else{
      const filteredResource=resourcesList.filter((resource: any)=> resource.resourceId==Number(resourceId));
      selectedResourceDetails.resourceId=filteredResource[0].resourceId
      selectedResourceDetails.resourceType=filteredResource[0].resourceType
      selectedResourceDetails.role=filteredResource[0].role
      selectedResourceDetails.supervisor=filteredResource[0].manager  
      selectedResourceDetails.location=filteredResource[0].location
      selectedResourceDetails.resourceMarket=filteredResource[0].resourceMarket
    }
    

  const resetFormFields=()=>{
    setAllocationStartDate(new Date());
    setAllocationEndDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
    setPTODays("");
    setAllocationPercentage("");
    setResourceType1("0");
    setResourceId("0");
    setProject("0");
  }

  const formSubmitHandler = async (event: any) => {
    event.preventDefault();
    let payload = {
    fkResourceID : resourceId=="0" ? 0 : Number(resourceId), 
    fkProjectID : 2, 
    startDate : allocationStartDate, 
    enddDate : allocationEndDate, 
    pTODays : ptoDays=="" ? 0 : Number(ptoDays),
    allocationHours : allocationHours, //=="" ? 0 : Number(allocationHours),
    isActive : 1,
    createdBy : "Admin"
    };
    try {
      const response = await fetch("https://localhost:44314/api/v1/ProjectAllocations/PostProjectAllocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataResponse = await response.json();
      if (dataResponse.length) {
        if (dataResponse[0].statusCode == "201") {
          console.log(dataResponse[0].statusReason);
          console.log(dataResponse[0].recordsCreated);

          dispatch(projectAllocationActions.changeToggle());
          resetFormFields();
          closeModal();
        } else console.log(dataResponse[0].errorMessage);
      } else console.log("Bad response");
    } catch {
      console.log("Error");
    }
    
  };

  console.log((allocationEndDate.getTime()-allocationStartDate.getTime())/(1000 * 3600 * 24));
  
  return (
    <>
      <Button
        className="btn btn-primary"
        style={{ float: "right", marginTop: "-50px" }}
        variant="primary"
        onClick={initModal}
      >
        <i className="las la-plus"></i> Allocate New Project
      </Button>
      <Modal show={isShow} id="project_allocation_modal">
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>
            <h6>Allocate New Project</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resource">
                  Resource
                </label>
                <div className="dropdown">
                  <select className="form-control" id="resource" value={resourceId} onChange={setResourceDetails}>
                    <option value="0">Select</option>
                    {resourcesList.map((resource: any)=><option key={resource.resourceId} value={resource.resourceId.toString()}>{resource.resourceName}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceType">
                  Resource Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceType"
                  value={selectedResourceDetails.resourceType}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="role">
                  Role
                </label>
                <input type="text" className="form-control" id="role" value={selectedResourceDetails.role} disabled />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="supervisor">
                  Supervisor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supervisor"
                  value={selectedResourceDetails.supervisor}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ocation">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={selectedResourceDetails.location}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceMarket">
                  Resource Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resourceMarket"
                  value={selectedResourceDetails.resourceMarket}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="project">
                  Project
                </label>
                <div className="dropdown">
                  <select className="form-control" id="project" value={project} onChange={setProjectDetails}>
                    <option value="0">Select</option>
                    <option value="1">HCP CA Region - Windows Server 2008/2008R2 Upgrade</option>
                    <option value="2">NAMM Thycotic Privilege Access Management (PAM) </option>
                    <option value="3">Regional CIRC Implementation</option>
                    <option value="4">SMS Manager</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="resourceType1">
                  Resource Type 1
                </label>
                <div className="dropdown">
                  <select
                    className="form-control "
                    id="resourceType1Dropdown"
                    value={resourceType1}
                    onChange={(event) => setResourceType1(event.target.value)}
                  >
                    <option value="0">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Dev Manager">Dev Manager</option>
                    <option value="QA">QA</option>
                    <option value="QA Manager">QA Manager</option>
                    <option value="Sr. Developer">Sr. Developer</option>
                    <option value="Sr. QA">Sr. QA</option>
                    <option value="Technical Lead">Technical Lead</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="project Market">
                  Project Market
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectMarket"
                  value={selectedProjectDetails.projectMarket}
                  disabled
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ppsid">
                  PPSID
                </label>
                <input type="text" className="form-control" id="ppsid" value={selectedProjectDetails.PPSID} disabled />
              </div>
              
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="capex">
                  Expense Type
                </label>
                <input type="text" className="form-control" id="capex" value={selectedProjectDetails.CAPEX} disabled />
              </div>
              
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationStartDate" style={{ zIndex: "9" }}>
                  Allocation Start Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setAllocationStartDate}
                  value={allocationStartDate}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationEndDate" style={{ zIndex: "9" }}>
                  Allocation End Date
                </label>
                <DatePicker
                  className="form-control"
                  onChange={setAllocationEndDate}
                  value={allocationEndDate}
                  format="dd/MM/yyyy"
                  dayPlaceholder="dd"
                  monthPlaceholder="mm"
                  yearPlaceholder="yyyy"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="ptoDays">
                  PTO Days
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ptoDays"
                  value={ptoDays}
                  onChange={(event) => setPTODays(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Percentage)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocationPercentage"
                  value={allocationPercentage}
                
                  onChange={(event) => setAllocationPercentage(event.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label" htmlFor="allocationHours">
                  Allocation(Hours)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="allocationHours"
                  value={allocationHours}
                  disabled
                  // onChange={(event) => setAllocationHours(event.target.value)}
                />
              </div>
              
              
            </div>
            <div className="row">
              <div className="col-md-12">
                <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
                      <Button variant="danger" onClick={closeModal}>
                          Close
                      </Button>
                  </Modal.Footer> */}
      </Modal>
    </>
  );
};
export default ProjectAllocation;
