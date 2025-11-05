export async function generateMetadata({ params }) {
    const { id } = await params;
    return {
        title: `User ${id} Profile`
    };
}

export default function ProfilePage() {
    return (<>specific user page</>)
}