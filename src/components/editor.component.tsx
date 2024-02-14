import { useDrop } from "react-dnd";
import { ItemType, Tag, TagComponent, defaultTags } from "./tag.component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRef } from "react";

export const EditorComponent: React.FC = () => {
    const editorRef = useRef<ClassicEditor>();

    const [, drop] = useDrop(() => ({
        accept: ItemType.TAG,
        drop: (item: Tag) => {
           editorRef.current?.model.change((writer) => {
                const selection = editorRef.current?.model.document.selection;
                if (selection) {
                     const range = selection.getFirstRange();
                     if (range) {
                          writer.insertText(item.text, range.start);
                     }
                }
              });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));


    return (
        <>
        {defaultTags.map((tag) => (<TagComponent key={tag.name} {...tag} /> ))}
        <div ref={drop} className="editor">
            <CKEditor 
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p> <p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                    editorRef.current = editor;
                    }
                }
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
            />
        </div>
        </>
    );
};