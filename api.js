const BASE_URL = 'https://api.coinpaprika.com/v1/';
const COINS_RUL = `${BASE_URL}/coins`;

export const coins = () => (
    fetch(COINS_RUL).then((res) => res.json())
)