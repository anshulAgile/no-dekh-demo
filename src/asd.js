import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { components } from "react-select";
import {
    charityCauseList,
    notificationHistory,
    sendNotificationAction,
} from "../../actions/notification";
import {
    renderField,
    renderMultiSelectInput,
    renderOptimisedSelectField,
    renderSelectField,
    rendertextarea,
} from "../../components/forms";
import Breadcrumb from "../../components/layout/Breadcrumb";
import { notificationValidations as validate } from "../../components/validations/cms";
import "./notification.scss";
import { InputOption } from "../../components/common/InputOption";
import { CharityManagementListing } from "../../actions/charity";
import { causeListing } from "../../actions/cause";
import parse from "html-react-parser";
import { FixedSizeList as List } from "react-window";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions } from "./loadOptions";

const list = [
    {
        name: "Notification Management",
        link: "/send_notification",
        isactive: false,
    },
];

const filterOptions = [
    { value: "Nonprofit", label: "Nonprofit" },
    { value: "Cause", label: "Cause" },
];

const customStyles = {
    headRow: {
        style: {
            maxWidth: "1200px",
        },
    },
    rows: {
        style: {
            maxWidth: "1200px", // override the row height
        },
    },
    headCells: {
        style: {
            paddingTop: "8px",
            paddingBottom: "8px",
        },
    },
    cells: {
        style: {
            whiteSpace: "wrap",
            paddingTop: "8px",
            paddingBottom: "8px",
        },
    },
};

const NotificationToAllUsers = () => {
    const dispatch = useDispatch();

    const [notificationsList, setNotificationsList] = useState([]);
    const [charityCauseValue, setCharityCauseValue] = useState();
    const [totalRecords, settotalRecords] = useState(0);
    const [arg, setArg] = useState({
        page: 1,
        limit: 10,
        search: "",
    });
    const [options, setOptions] = useState([]);
    const [loadedOptions, setLoadedOptions] = useState([]);
    const [shouldResetOptions, setShouldResetOptions] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchText, setSearchText] = useState("");

    const [listArgs] = useState({
        page: 1,
        limit: 50000,
        isNavigator: false,
    });

    const [causelistArgs] = useState({
        page: 1,
        limit: 50000,
        isNavigator: false,
    });

    useEffect(() => {
        setPage(1);
        setLoadedOptions([]);
        setSearchText("");
    }, [charityCauseValue]);

    useEffect(() => {
        if (charityCauseValue?.value === "Nonprofit") {
            // dispatch(charityCauseList(payload)).then((res) => {
            //   console.log("res ========>", res);
            // });
            dispatch(CharityManagementListing(listArgs)).then((res) => {
                const charityList = res?.data?.charityList?.map((charity) => {
                    return {
                        label: charity?.charityName,
                        value: charity?._id,
                    };
                });
                setOptions(charityList);
            });
        }
        if (charityCauseValue?.value === "Cause") {
            dispatch(causeListing(causelistArgs)).then((res) => {
                const causeList = res?.data?.causeFilter?.map((cause) => {
                    return {
                        label: cause?.causename,
                        value: cause?._id,
                    };
                });
                setOptions(causeList);
            });
        }
    }, [causelistArgs, charityCauseValue, dispatch, listArgs]);

    const notificationHistoryAPICall = () => {
        dispatch(notificationHistory(arg)).then((res) => {
            setNotificationsList(res.data.notificationHistoryList);
            settotalRecords(res?.data?.total_records || 0);
        });
    };

    useEffect(() => {
        notificationHistoryAPICall();
    }, [arg]);

    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
        },
        {
            name: "Description",
            selector: (row) => row.message,
            cell: (row) => (
                <ul>
                    {row.message?.split("\n").map(function (item, idx) {
                        return <li key={idx}>{item}</li>;
                    })}
                </ul>
            ),
        },
        // (
        //     <div dangerouslySetInnerHTML={{ __html: row.message }} />
        //   ),
        {
            name: "Time",
            selector: (row) => moment(row?.createdDate).format("HH:mm:ss MM/DD/YYYY"),
            minWidth: "100%",
            width: "200px",
        },
    ];

    const handlePageChange = (page) => {
        setArg({ ...arg, page: page });
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setArg({ ...arg, limit: newPerPage });
    };

    const onSubmit = (value, form) => {
        let notificationPlayod = {
            message: value.message,
            title: value.title,
        };

        console.log("value.nonprofitOrCause: ", value?.nonprofitOrCause?.value);
        if (value.nonprofitOrCause?.value === "Nonprofit") {
            const charities = value?.nonprofitorcausedata?.map((item, ind) => {
                notificationPlayod = {
                    ...notificationPlayod,
                    message: notificationPlayod.message + `\n- ${item.label}`,
                };
                return item.value;
            });
            notificationPlayod.charities = charities ?? [];
            notificationPlayod.causes = [];
            // const details = value?.nonprofitorcausedata?.map((item) => item.label);
            // notificationPlayod.details = details ?? [];
        }
        if (value.nonprofitOrCause?.value === "Cause") {
            const cause = value?.nonprofitorcausedata?.map((item, ind) => {
                notificationPlayod = {
                    ...notificationPlayod,
                    message: notificationPlayod.message + `\n- ${item.label}`,
                };
                return item.value;
            });
            notificationPlayod.charities = [];
            notificationPlayod.causes = cause ?? [];
            // const details = value?.nonprofitorcausedata?.map((item) => item.label);
            // notificationPlayod.details = details ?? [];
        }

        dispatch(sendNotificationAction(notificationPlayod)).then(() => {
            form.reset();
            form.resetFieldState("message");
            form.resetFieldState("title");
            notificationHistoryAPICall();
            toast.success(
                "Notification has been sent successfully to all the users."
            );
        });
    };

    // REMOVEEEEEEEEEEEEEEEEEEE

    const increase = (numberOfRequests) => numberOfRequests + 1;


    const [value, onChange] = useState(null);
    console.log('value: ', value);


    const wrappedLoadOptions = async (search, prevOptions) => {
        let payload = {
            page: 1,
            limit: 10
        }

        if (charityCauseValue?.value === "Nonprofit") payload.type = "charity";
        if (charityCauseValue?.value === "Cause") payload.type = "cause";

        if (search) {
            payload.search = search;
            payload.page = 1;
        }

        console.log('prevOptions: ', prevOptions);
        console.log('search: ', search);
        console.log('payload: ', payload);

        try {
            if (payload.type) {
                const res = await dispatch(charityCauseList(payload));

                const list = res?.data?.list?.map((charity) => {
                    return {
                        label: charity?.name,
                        value: charity?._id,
                    };
                }) || [];
                setPage(page + 1);
                return {
                    options: list,
                    hasMore: res?.data?.list?.length !== res?.data?.total_records,
                };
            } else {
                return {
                    options: [],
                };
            }
        } catch (err) {
            return {
                options: [],
                hasMore: false
            };
            // console.log("error", err);
        }

        // return {
        //   options: [],
        //   hasMore: false
        // };
    }

    // REMOVEEEEEEEEEEEEEEEEEEE

    // const loadOptions = async (search, prevOptions) => {
    //   console.log('prevOptions: ', prevOptions);
    //   console.log("first========>", search);
    //   const payload = {
    //     page,
    //     limit,
    //   };

    //   if (search) {
    //     payload.search = search;
    //     if (!searchText) {
    //       payload.page = 1;
    //       setPage(1);
    //     }
    //   }

    //   if (charityCauseValue?.value === "Nonprofit") payload.type = "charity";
    //   if (charityCauseValue?.value === "Cause") payload.type = "cause";

    //   try {
    //     if (payload.type) {
    //       const res = await dispatch(charityCauseList(payload));

    //       const list = res?.data?.list?.map((charity) => {
    //         return {
    //           label: charity?.name,
    //           value: charity?._id,
    //         };
    //       });
    //       setPage(page + 1);
    //       // if (page === 1) setLoadedOptions(list);
    //       return {
    //         options: list,
    //         hasMore: true,
    //       };
    //     } else {
    //       return {
    //         options: [],
    //       };
    //     }
    //   } catch (err) {
    //     console.log("error", err);
    //   }
    // };

    return (
        <>
            <div>
                <div className="top-box">
                    <Breadcrumb list={list} />
                    <h2>Notification Management</h2>
                </div>
            </div>

            <div className="section-inner notification-inner">
                <div className="form-area">
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        mutators={{
                            // expect (field, value) args from the mutator
                            setValue: ([field, value], state, { changeValue }) => {
                                changeValue(state, field, () => value);
                            },
                        }}
                    >
                        {({ handleSubmit, form }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="input-list d-flex flex-wrap">
                                    <div className="col-12 p-0 col-div">
                                        <label className="label-text">
                                            <span>*</span> Title
                                        </label>
                                        <Field
                                            name="title"
                                            component={renderField}
                                            placeholder="Enter notification title "
                                            className="form-grp"
                                            inputclass="input-box"
                                        />
                                    </div>
                                    <div className="col-12 p-0 col-div">
                                        <label className="label-text">
                                            {" "}
                                            <span>*</span> Description{" "}
                                        </label>
                                        <Field
                                            name="message"
                                            placeholder="Write Something..."
                                            component={rendertextarea}
                                            className="form-grp"
                                            inputclass="input-box text-area-box"
                                        />
                                    </div>
                                    <div className="col-12 p-0 col-div">
                                        <label className="label-text">Nonprofit or Cause</label>
                                        <Field
                                            name="nonprofitOrCause"
                                            component={renderSelectField}
                                            mutator={form.mutators.setValue}
                                            onValueChange={(e) => {
                                                setCharityCauseValue(e);
                                                // setShouldResetOptions(true);
                                                setShouldResetOptions((prev) => prev + 1);
                                            }}
                                            className="basic-multi-select"
                                            options={filterOptions}
                                            isMulti={false}
                                            onChange={(e) => {
                                                console.log("e: ", e);
                                                // setCharityCauseValue(e);
                                                // form.change("nonprofitorcausedata", []);
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 p-0 col-div">
                                        <label className="label-text">
                                            {" "}
                                            please select charity or cause
                                        </label>
                                        <AsyncPaginate
                                            debounceTimeout={300}
                                            value={value}
                                            isMulti={true}
                                            loadOptions={wrappedLoadOptions}
                                            onChange={onChange}
                                        />
                                        {/* <Field
                      name="nonprofitorcausedata"
                      key={shouldResetOptions}
                      component={renderOptimisedSelectField}
                      // value={loadedOptions}
                      className="basic-multi-select"
                      // options={loadedOptions}
                      loadOptions={(search, prevOptions) =>
                        loadOptions(search, prevOptions)
                      }
                      isMulti={true}
                      closeMenuOnSelect={false}
                    // onChange={setLoadedOptions}
                    /> */}
                                    </div>
                                    {/* <div className="col-12 p-0 col-div">
                    <label className="label-text">
                      please select charity or cause
                    </label>
                    <Field
                      name="nonprofitorcausedata"
                      component={renderMultiSelectInput}
                      className="basic-multi-select"
                      options={options}
                      isMulti={true}
                      closeMenuOnSelect={false}
                      inputOption={InputOption}
                    />
                  </div> */}
                                    <div className="d-flex flex-wrap justify-content-end form-btn-box send-notification-btn w-100 ">
                                        <button type="submit" className="link-btn">
                                            Send
                                        </button>
                                    </div>
                                </div>
                                {/* <div className="d-flex flex-wrap form-btn-box position-box">
                  <button type="submit" className="link-btn">
                    Send
                  </button>
                </div> */}
                            </form>
                        )}
                    </Form>
                </div>
                <DataTable
                    border
                    columns={columns}
                    data={notificationsList}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRecords}
                    onChangeRowsPerPage={handlePerRowsChange}
                    customStyles={customStyles}
                    onChangePage={handlePageChange}
                    dense
                />
            </div>
        </>
    );
};

export default NotificationToAllUsers;
