import { useLayout } from "@components/Layout";
import { MediaView } from "@components/View";
import Button from "../components/Button";
import InputText from "../components/InputText";
import Texte from "../components/Text";
import Cursor from "../components/Cursor";
import Exporter from "@components/Exporter";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function Home() {
  const { components, setComponents } = useLayout();

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...components];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setComponents(copyListItems);
  };

  const printDocument = () => {
    const report = new jsPDF("p", "pt", "a4");
    report.html(document.querySelector("#report")).then(() => {
      report.save("export.pdf");
    });
  };
  return (
    <Exporter printDocument={() => printDocument()}>
      <div className="relative w-full h-full m-4 my-3 overflow-y-auto grow">
        {components.map((component, index) => {
          if (component.type === "button") {
            return (
              <div
                className="y-10 w-fit h-fit active:cursor-move"
                style={{
                  top: component.position?.y || 0 + index * 40,
                  left: component.position?.x || 0,
                }}
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, index);
                }}
                onDragEnd={drop}
                draggable
              >
                <Button
                  content={component.props?.text}
                  bgColor={component.props?.bgColor}
                  textColor={component.props?.textColor}
                  borderColor={component.props?.borderColor}
                />
              </div>
            );
          }
          if (component.type === "textinput") {
            return (
              <div
                className="mt-2 y-10 w-fit h-fit"
                style={{
                  top: component.position?.y || 0 + index * 40,
                  left: component.position?.x || 0,
                }}
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, index);
                }}
                onDragEnd={drop}
                draggable
              >
                <InputText
                  textPlaceHolder={component.props?.text}
                  bgColor={component.props?.bgColor}
                  textColor={component.props?.textColor}
                  borderColor={component.props?.borderColor}
                />
              </div>
            );
          }
          if (component.type === "image") {
            return (
              <div
                className="mt-2"
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, index);
                }}
                onDragEnd={drop}
                draggable
              >
                <MediaView
                  type={component.type}
                  name={component?.name}
                  url={component?.props?.url}
                />
              </div>
            );
          }
          if (component.type === "cursor") {
            return (
              <div
                className="mt-2 w-fit h-fit"
                style={{
                  top: component.position?.y || 0 + index * 40,
                  left: component.position?.x || 0,
                }}
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, index);
                }}
                onDragEnd={drop}
                draggable
              >
                <Cursor
                  min={component.props?.min}
                  max={component.props?.max}
                  value={component.props?.value}
                  step={component.props?.step}
                />
              </div>
            );
          }
          if (component.type === "text") {
            return (
              <div
                className="mt-2 w-fit h-fit"
                style={{
                  top: component.position?.y || 0 + index * 40,
                  left: component.position?.x || 0,
                }}
                onDragStart={(e) => {
                  dragStart(e, index);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, index);
                }}
                onDragEnd={drop}
                draggable
              >
                <Texte
                  text={component.props?.text}
                  height={component.props?.height}
                  width={component.props?.width}
                  textColor={component.props?.textColor}
                />
              </div>
            );
          }
        })}
      </div>
    </Exporter>
  );
}
