import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import OrderPage from "../OrderPage";
import Context from "../../../ContextComponent";

const mockSrore = configMockStore();

const constantDate = new Date('2017-06-13')

Date = class extends Date {
  constructor() {
    return constantDate
  }
}

describe("Test of <OrderPage/>", ()=>{
    const customDate = "2017-06-14"
    // let date = new Date();
    // let buffDate = new Date();
    // buffDate.setDate(buffDate.getDate()+1);
    // const customDate = `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
    //   -2
    //   )}-${("0" + buffDate.getDate()).slice(-2)}`;
    // buffDate.setDate(buffDate.getDate()-1);
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    it("Default view", async ()=>{
        const store = mockSrore({
            ordersReducer: {
                currentOrder: {},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
    
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("Call submit event when one field of form is empty (time field)", async ()=>{
        const store = mockSrore({
            ordersReducer: {
                currentOrder: {},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Town"
                },
                size: {
                    value: "small"
                },
                name: {
                    value: "Name"
                },
                email: {
                    value: "valid@mail.com"
                },
                time: {
                    value: ""
                },
                date: {
                    value: customDate
                }
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
        const headerReturn = component.root.findByType("form").props.onSubmit(eventObject)
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
        expect(headerReturn).toBeFalsy();
    });
    it("Call submit event when email field is invalid", async ()=>{
        const store = mockSrore({
            ordersReducer: {
                currentOrder: {},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Town"
                },
                size: {
                    value: "small"
                },
                name: {
                    value: "Name"
                },
                email: {
                    value: "invalid.com"
                },
                time: {
                    value: "14:00"
                },
                date: {
                    value: customDate
                }
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
        const headerReturn = component.root.findByType("form").props.onSubmit(eventObject)
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(headerReturn).toBeFalsy();
    });
    it("Call submit event when time field is invalid", async ()=>{
        const store = mockSrore({
            ordersReducer: {
                currentOrder: {},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Town"
                },
                size: {
                    value: "small"
                },
                name: {
                    value: "Name"
                },
                email: {
                    value: "valid@mail.com"
                },
                time: {
                    value: "19:00"
                },
                date: {
                    value: customDate
                }
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
        const headerReturn = component.root.findByType("form").props.onSubmit(eventObject)
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(headerReturn).toBeFalsy();
    });
    it("Call submit event when name field is invalid (name contains number)", async ()=>{
        const store = mockSrore({
            ordersReducer: {
                currentOrder: {},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Town"
                },
                size: {
                    value: "small"
                },
                name: {
                    value: "Name1234"
                },
                email: {
                    value: "valid@mail.com"
                },
                time: {
                    value: "14:00"
                },
                date: {
                    value: customDate
                }
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
        const headerReturn = component.root.findByType("form").props.onSubmit(eventObject)
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(headerReturn).toBeFalsy();
    });
    it.only("Call submit event when date field is invalid (date less then current date)", async ()=>{
        // let date = new Date();
        // let buffDate = new Date();
        // buffDate.setDate(buffDate.getDate()-2);
        // const customDate = `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
        //   -2
        //   )}-${("0" + buffDate.getDate()).slice(-2)}`;
        // buffDate.setDate(buffDate.getDate()+2);

        const store = mockSrore({
            ordersReducer: {
                currentOrder: {time: "14:00", size: "small"},
                orderFormIsLoad: false
            },
            townReduser: {
                townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
                townsInOrderFormIsLoad: false
            }
        })
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Town"
                },
                size: {
                    value: "small"
                },
                name: {
                    value: "Name"
                },
                email: {
                    value: "valid@mail.com"
                },
                time: {
                    value: "14:00"
                },
                date: {
                    value: "2017-06-14"
                }
            }
        }
        let component;
        await act(async ()=>{
            component = await create(
            <Provider store = {store}>
                <Context.Provider value = {mockContextValue}>
                    <OrderPage {...mockProps}/>
                </Context.Provider>
            </Provider>
            );
        });
        let headerReturn
        await act(async()=>{
            headerReturn = await component.root.findByType("form").props.onSubmit(eventObject)
        })
        
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(headerReturn).toBeFalsy();
    });
    // it("Call submit event when all field are valid and server return object with success field with true value", async ()=>{
    //     global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
    //     const store = mockSrore({
    //         ordersReducer: {
    //             currentOrder: {time: "14:00"},
    //             orderFormIsLoad: false
    //         },
    //         townReduser: {
    //             townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
    //             townsInOrderFormIsLoad: false
    //         }
    //     })
    //     const mockContextValue = {
    //         openErrorWindowWithMsg: jest.fn(),
    //         openWarningTooltip: jest.fn(),
    //         warningTooltipMsg: "Warning"
    //     }
    //     const mockProps = {
    //         history: {
    //             push: jest.fn()
    //         }
    //     }
    //     const eventObject = {
    //         preventDefault: jest.fn(),
    //         target: {
    //             town: {
    //                 value: "Town"
    //             },
    //             size: {
    //                 value: "small"
    //             },
    //             name: {
    //                 value: "Name"
    //             },
    //             email: {
    //                 value: "valid@mail.com"
    //             },
    //             time: {
    //                 value: "14:00"
    //             },
    //             date: {
    //                 value: customDate
    //             }
    //         }
    //     }
    //     let component;
    //     await act(async ()=>{
    //         component = await create(
    //         <Provider store = {store}>
    //             <Context.Provider value = {mockContextValue}>
    //                 <OrderPage {...mockProps}/>
    //             </Context.Provider>
    //         </Provider>
    //         );
    //     });
    //     await act(async ()=>{
    //         await component.root.findByType("form").props.onSubmit(eventObject)
    //     })
    //     expect(mockProps.history.push.mock.calls.length).toBe(1);
    // });
    // it("Call submit event when all field are valid and server return object with success field with false value", async ()=>{
    //     global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: false}))}));
    //     const store = mockSrore({
    //         ordersReducer: {
    //             currentOrder: {time: "14:00"},
    //             orderFormIsLoad: false
    //         },
    //         townReduser: {
    //             townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
    //             townsInOrderFormIsLoad: false
    //         }
    //     })
    //     const mockContextValue = {
    //         openErrorWindowWithMsg: jest.fn(),
    //         openWarningTooltip: jest.fn(),
    //         warningTooltipMsg: "Warning"
    //     }
    //     const mockProps = {
    //         history: {
    //             push: jest.fn()
    //         }
    //     }
    //     const eventObject = {
    //         preventDefault: jest.fn(),
    //         target: {
    //             town: {
    //                 value: "Town"
    //             },
    //             size: {
    //                 value: "middle"
    //             },
    //             name: {
    //                 value: "Name"
    //             },
    //             email: {
    //                 value: "valid@mail.com"
    //             },
    //             time: {
    //                 value: "14:00"
    //             },
    //             date: {
    //                 value: customDate
    //             }
    //         }
    //     }
    //     let component;
    //     await act(async ()=>{
    //         component = await create(
    //         <Provider store = {store}>
    //             <Context.Provider value = {mockContextValue}>
    //                 <OrderPage {...mockProps}/>
    //             </Context.Provider>
    //         </Provider>
    //         );
    //     });
    //     await act(async ()=>{
    //         await component.root.findByType("form").props.onSubmit(eventObject)
    //     })
    //     expect(mockProps.history.push.mock.calls.length).toBe(1);
    //     expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1)
    // });
    // it("Call submit event when all field are valid and user choose small size of clock and server return object with success field with true value", async ()=>{
    //     global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
    //     const store = mockSrore({
    //         ordersReducer: {
    //             currentOrder: {time: "14:00", size: "small"},
    //             orderFormIsLoad: false
    //         },
    //         townReduser: {
    //             townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
    //             townsInOrderFormIsLoad: false
    //         }
    //     })
    //     const mockContextValue = {
    //         openErrorWindowWithMsg: jest.fn(),
    //         openWarningTooltip: jest.fn(),
    //         warningTooltipMsg: "Warning"
    //     }
    //     const mockProps = {
    //         history: {
    //             push: jest.fn()
    //         }
    //     }
    //     const eventObject = {
    //         preventDefault: jest.fn(),
    //         target: {
    //             town: {
    //                 value: "Town"
    //             },
    //             size: {
    //                 value: "small"
    //             },
    //             name: {
    //                 value: "Name"
    //             },
    //             email: {
    //                 value: "valid@mail.com"
    //             },
    //             time: {
    //                 value: "14:00"
    //             },
    //             date: {
    //                 value: customDate
    //             }
    //         }
    //     }
    //     let component;
    //     await act(async ()=>{
    //         component = await create(
    //         <Provider store = {store}>
    //             <Context.Provider value = {mockContextValue}>
    //                 <OrderPage {...mockProps}/>
    //             </Context.Provider>
    //         </Provider>
    //         );
    //     });
    //     await act(async ()=>{
    //         await component.root.findByType("form").props.onSubmit(eventObject)
    //     })
    //     expect(mockProps.history.push.mock.calls.length).toBe(1);
    // });
    // it("Call submit event when all field are valid and user choose middle size of clock and server return object with success field with true value", async ()=>{
    //     global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
    //     const store = mockSrore({
    //         ordersReducer: {
    //             currentOrder: {time: "14:00", size: "middle"},
    //             orderFormIsLoad: false
    //         },
    //         townReduser: {
    //             townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
    //             townsInOrderFormIsLoad: false
    //         }
    //     })
    //     const mockContextValue = {
    //         openErrorWindowWithMsg: jest.fn(),
    //         openWarningTooltip: jest.fn(),
    //         warningTooltipMsg: "Warning"
    //     }
    //     const mockProps = {
    //         history: {
    //             push: jest.fn()
    //         }
    //     }
    //     const eventObject = {
    //         preventDefault: jest.fn(),
    //         target: {
    //             town: {
    //                 value: "Town"
    //             },
    //             size: {
    //                 value: "small"
    //             },
    //             name: {
    //                 value: "Name"
    //             },
    //             email: {
    //                 value: "valid@mail.com"
    //             },
    //             time: {
    //                 value: "14:00"
    //             },
    //             date: {
    //                 value: customDate
    //             }
    //         }
    //     }
    //     let component;
    //     await act(async ()=>{
    //         component = await create(
    //         <Provider store = {store}>
    //             <Context.Provider value = {mockContextValue}>
    //                 <OrderPage {...mockProps}/>
    //             </Context.Provider>
    //         </Provider>
    //         );
    //     });
    //     await act(async ()=>{
    //         await component.root.findByType("form").props.onSubmit(eventObject)
    //     })
    //     expect(mockProps.history.push.mock.calls.length).toBe(1);
    // });
    // it("Call submit event when all field are valid and user choose large size of clock and server return object with success field with true value", async ()=>{
    //     global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
    //     const store = mockSrore({
    //         ordersReducer: {
    //             currentOrder: {time: "14:00", size: "large"},
    //             orderFormIsLoad: false
    //         },
    //         townReduser: {
    //             townsArr: [{id: 1, name: "Town1"}, {id: 2, name: "Town2"}],
    //             townsInOrderFormIsLoad: false
    //         }
    //     })
    //     const mockContextValue = {
    //         openErrorWindowWithMsg: jest.fn(),
    //         openWarningTooltip: jest.fn(),
    //         warningTooltipMsg: "Warning"
    //     }
    //     const mockProps = {
    //         history: {
    //             push: jest.fn()
    //         }
    //     }
    //     const eventObject = {
    //         preventDefault: jest.fn(),
    //         target: {
    //             town: {
    //                 value: "Town"
    //             },
    //             size: {
    //                 value: "small"
    //             },
    //             name: {
    //                 value: "Name"
    //             },
    //             email: {
    //                 value: "valid@mail.com"
    //             },
    //             time: {
    //                 value: "14:00"
    //             },
    //             date: {
    //                 value: customDate
    //             }
    //         }
    //     }
    //     let component;
    //     await act(async ()=>{
    //         component = await create(
    //         <Provider store = {store}>
    //             <Context.Provider value = {mockContextValue}>
    //                 <OrderPage {...mockProps}/>
    //             </Context.Provider>
    //         </Provider>
    //         );
    //     });
    //     await act(async ()=>{
    //         await component.root.findByType("form").props.onSubmit(eventObject)
    //     })
    //     expect(mockProps.history.push.mock.calls.length).toBe(1);
    // });
});