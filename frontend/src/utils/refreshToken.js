export const refreshTokenSetup = (res) => {
    //Timing to renew access token
    let refreshTiming = (res.token0bj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
};