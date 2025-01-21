export const LoadMoreBtn = ({onClick, disabled}) => {
    return (
        <button className="button button__main button__long" onClick={onClick} disabled={disabled}>
            <div className="inner">Load more</div>
        </button>
    )
} 