export function filterData(searchText, restaurants) {
    return restaurants.filter((restau) => {
        return restau?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    });
}