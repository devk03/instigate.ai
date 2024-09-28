export const fetchInstigation = async (message: string) => {
    const API_URL = "http://0.0.0.0:8080/instigate";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return { instigation: data.message, error: null };
    } catch (error) {
        console.error("Error in fetchInstigation():", error);
        return { instigation: null, error: "Failed to fetch instigation. Please try again." };
    }
};
