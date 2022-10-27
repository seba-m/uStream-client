
export function LandingCard({ stream }) {

    const { username, avatarUrl, bannerUrl } = stream;

    return (
        <div>
            <div style={{backgroundImage: `url(${bannerUrl})`}}>
                <img src={avatarUrl} alt={username} />
                <h3>{username}</h3>
            </div>
        </div>
    )
}
