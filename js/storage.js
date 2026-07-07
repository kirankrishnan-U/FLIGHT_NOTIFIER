function saveRecentSearch(flight){

    let history =
        JSON.parse(
            localStorage.getItem("history")
        ) || [];

    history.unshift(flight);

    history = [...new Set(history)];

    history = history.slice(0,10);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}