const getGreeting = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour < 12) {
        return 'Good morning';
    } else if (currentHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
};

export default getGreeting;