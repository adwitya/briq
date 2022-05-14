import styled from "@emotion/styled";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React from "react";
import './BRIQToolTip.css';

interface BRIQToolTipProps {
    arrow?: boolean;
    className?: string;
    placement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined;
    title: string;
    children: any;
}

export const BRIQToolTip = styled(({ className, ...props }: BRIQToolTipProps) => (
    <Tooltip {...props}
        arrow={props.arrow}
        classes={{ popper: className }}
        title={props.title}
        placement={props.placement || 'right'} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: '#4e5268'
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `#4e5268`,
    },
}));