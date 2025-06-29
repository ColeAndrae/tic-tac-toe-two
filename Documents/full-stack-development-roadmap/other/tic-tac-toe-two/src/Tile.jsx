export default function Tile(props) {

    const fn = props.fn
    const r = props.r;
    const c = props.c;

    return (
        <button value={[r, c]} onClick={fn} className="h-20 w-20 border-1 text-6xl rounded-none font-serif"></button>
    );

}