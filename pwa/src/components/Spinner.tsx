function Spinner() {
    return (
        <div className="flex mt-16 justify-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Ładowanie...</span>
            </div>
        </div>
    );
}

export default Spinner;
