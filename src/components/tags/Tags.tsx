
type TagProps = {
    tag?: string

}


function Tags({ tag }: TagProps) {

    return (
        <div className="tags">
            <span>
                {tag}
            </span>
        </div>
    );
}

export default Tags;