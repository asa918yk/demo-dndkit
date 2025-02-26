import { style } from "@vanilla-extract/css";

export const styleWrapper = style({
    padding: "20px",
});

export const styleContainerWrapper = style({
    display: "flex",
    gap: "20px",
    marginTop: "20px",
});

export const styleContainer = style({
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
});

export const styleItem = style({
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});