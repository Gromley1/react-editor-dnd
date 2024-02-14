import { useDrag } from "react-dnd";

export interface Tag {
  name: string;
  text: string;
}

export const defaultTags: Tag[] = [
    { name: "React", text: "{{React}}" },
    { name: "Angular", text: "{{Angular}}" },
    { name: "Vue", text: "{{Vue}}" },
];

export enum ItemType {
  TAG = "tag",
}

export const TagComponent: React.FC<Tag> = ({ name, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TAG,
        item: { name, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className="tag">
            <span>{name}</span>
        </div>
    );
};