
function SearchBar({ placeholder, searchInput, setSearchInput }) {

    return (

        <div className="w-[90%] animate-fadeIn">
            <input className=" w-full border-none outline-none rounded-3xl px-3 py-1.5  bg-white text-black"
                placeholder={placeholder}
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
        </div>

    )
}

export default SearchBar
