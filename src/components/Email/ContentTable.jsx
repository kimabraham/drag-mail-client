import { LuLayoutPanelLeft } from "react-icons/lu";

const ContentTable = () => {
  return (
    <table
      className="content-table"
      style={{
        width: "100%",
        height: "100%",
        borderCollapse: "collapse",
        border: "1px dashed #70a1ff",
      }}
    >
      <tbody className="content-tbody">
        <tr className="content-row" style={{ height: "100%" }}>
          <td
            className="content-col"
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              paddingTop: "10px",
            }}
          >
            <LuLayoutPanelLeft size={30} style={{ color: "#70a1ff" }} />
          </td>
        </tr>
        <tr className="content-row" style={{ height: "100%" }}>
          <td
            className="content-col"
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              paddingBottom: "10px",
            }}
          >
            <span
              className="content-text"
              style={{ color: "#70a1ff", fontSize: "14px", height: "100%" }}
            >
              Your content here
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ContentTable;
