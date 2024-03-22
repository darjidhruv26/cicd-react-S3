import { Fragment } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

const   AccordionBox = (props) => {
    const data = props.data;

    const getPartitionWiseData = (data) => {
        const last = {}
        data.map((item) => {
            console.log(item)
            last['INTERPRETATION'] = last['INTERPRETATION'] ? [...last['INTERPRETATION'], [{SAMPLED_DATE: item.DATA.sampled_date}, {INTERPRETATION_TEXT: item.DATA.interpretation_text}]]: [
                [{SAMPLED_DATE: item.DATA.sampled_date}, {INTERPRETATION_TEXT: item.DATA.interpretation_text}]
            ]
            item.DATA.compartment_data.map((i, k) => {
                try {   
                    last[Object.keys(i)[0]] = last[Object.keys(i)[0]] ? [...last[Object.keys(i)[0]], [...i[Object.keys(i)[0]],  {SAMPLED_DATE: item.SAMPLED_DATE}]] : [[...i[Object.keys(i)[0]],  {SAMPLED_DATE: item.SAMPLED_DATE}]]
                } catch (error) {
                    console.log(error);
                }
            })
        })
        return last;
    }
    const partitionWiseData = getPartitionWiseData(data);

    const RenderTable = (props) => {
        return (
            <div className="responsive-table accordion-table">
                <table className="res-table">
                    <thead>
                        <tr>
                            {props.columns.map((column, index) => {
                                return <th key={index}>{column}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((row, index) => {
                            const finalRow = {}
                            row.map(i => {finalRow[Object.keys(i)[0]] = i[Object.keys(i)[0]]})
                            return (
                                <tr key={index}>
                                    {props.columns.map((column, i) => (
                                        <td key={i} title={finalRow[column]}>{finalRow[column]}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderAccordion = Object.keys(partitionWiseData).map((partition, i) => {
        const columns = new Set();
        columns.add("SAMPLED_DATE")
        partitionWiseData[partition].map((item) => {
            item.map((i) => {
                columns.add(Object.keys(i)[0]);
            })
        })
        const columnsArray = Array.from(columns);
        
        return (
            <AccordionItem key={i}>
                <AccordionItemHeading>
                    <AccordionItemButton>{partition}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <RenderTable
                        columns={columnsArray}
                        data={partitionWiseData[partition]}
                    />
                </AccordionItemPanel>
            </AccordionItem>
        )
    });

    return (
        <Fragment>
            <Accordion allowZeroExpanded>{renderAccordion}</Accordion>
        </Fragment>
    );
};

export default AccordionBox;