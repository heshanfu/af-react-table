import React, { memo } from "react";
import { css } from "@emotion/core";
import Colgroup from "../TbodyColgroup";
import { useApiPlugin } from "../useApi";

const SUBSCRIBE_EVENTS = [
    "widget-height-changed",
    "total-rows-quantity-changed",
    "virtual-scroll-offsets-changed",
    "visible-rows-range-changed",
    "columns-changed"
];

const wrapperCss = css`
    overflow: auto;
    min-height: 0;
    flex: 1 1 auto;
`;

const TableBody = memo(({
    wrapperRef,
    tbodyRef,
    RowComponent,
    CellComponent,
    EmptyDataRowComponent,
    bodyTableLayoutFixed,
    onScroll,
    getVisibleRows,
    getRowData,
    getRowKey,
    getRowExtraProps,
    mapCells,
    getCellData,
   // currentHorizontalScrollbarOffset
}) => {

    const API = useApiPlugin( SUBSCRIBE_EVENTS );

    const visibleRows = getVisibleRows(
        API.startIndex,
        API.endIndex,
        API.columns,
        getRowData,
        getRowKey,
        getRowExtraProps,
        RowComponent,
        mapCells,
        getCellData,
        CellComponent,
        EmptyDataRowComponent
    );

    const wrapperStyle = { height: API.widgetHeight };

    const tableStyle = {
        tableLayout: bodyTableLayoutFixed ? "fixed" : "auto",
        transform: `translateY(${API.virtualTopOffset}px)`
    };
    
    return (
        <div css={wrapperCss} style={wrapperStyle} ref={wrapperRef} onScroll={onScroll}>
            <div style={{ height: API.widgetScrollHeight }}>
                <table style={tableStyle}>
                    <Colgroup />
                    <tbody ref={tbodyRef}>
                        {visibleRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default TableBody;