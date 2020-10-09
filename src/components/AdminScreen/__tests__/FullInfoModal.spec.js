import React from 'react';
import {create} from "react-test-renderer";

import FullInfoModal from "../FullInfoModal";

it("Test of <FullInfoModal />", ()=>{
    const mockProps = {
        itemObj:{
            id: 1,
            rating: 5,
            name: "Petrovich",
            towns: ""
        }
    }
    const component = create(<FullInfoModal {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
});