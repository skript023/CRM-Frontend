import type { User } from "../../interface/user.interface";

export function Expired(params:User[]) 
{
    params.map((user, i) => {
        const endDate = new Date(user.expired);

        const intervalId  = setInterval(() => {
            const currentTime = new Date();
            const timeDifference = endDate.getTime() - currentTime.getTime();

            if (timeDifference <= 0) 
            {
                clearInterval(intervalId);
                document.getElementById(`years-${user._id}`)?.style.setProperty('--value', '0');
                document.getElementById(`months-${user._id}`)?.style.setProperty('--value', '0');
                document.getElementById(`days-${user._id}`)?.style.setProperty('--value', '0');
                document.getElementById(`hours-${user._id}`)?.style.setProperty('--value', '0');
                document.getElementById(`minutes-${user._id}`)?.style.setProperty('--value', '0');
                document.getElementById(`seconds-${user._id}`)?.style.setProperty('--value', '0');
                return;
            }

            let remainingSeconds = Math.floor(timeDifference / 1000);

            const years = Math.floor(remainingSeconds / (3600 * 24 * 365));
            remainingSeconds -= years * 3600 * 24 * 365;

            const months = Math.floor(remainingSeconds / (3600 * 24 * 30));
            remainingSeconds -= months * 3600 * 24 * 30;

            const days = Math.floor(remainingSeconds / (3600 * 24));
            remainingSeconds -= days * 3600 * 24;

            const hours = Math.floor(remainingSeconds / 3600);
            remainingSeconds -= hours * 3600;

            const minutes = Math.floor(remainingSeconds / 60);
            remainingSeconds -= minutes * 60;

            const seconds = remainingSeconds;

            if (years >= 1) 
            {
                document.getElementById(`years-${user._id}`)?.style.setProperty('--value', years.toString());
            } 
            else 
            {
                const elem = document.getElementById(`years-label-${user._id}`)
                if (elem)
                {
                    elem.style.display = 'none'
                }
            }

            if (months >= 1) 
            {
                document.getElementById(`months-${user._id}`)?.style.setProperty('--value', months.toString());
            } 
            else 
            {
                const elem = document.getElementById(`months-label-${user._id}`)
                if (elem)
                {
                    elem.style.display = 'none';
                }
            }

            if (days >= 1)
            {
                document.getElementById(`days-${user._id}`)?.style.setProperty('--value', days.toString());
            }
            else
            {
                const elem = document.getElementById(`days-label-${user._id}`)
                if (elem)
                {
                    elem.style.display = 'none';
                }
            }

            document.getElementById(`hours-${user._id}`)?.style.setProperty('--value', hours.toString());
            document.getElementById(`minutes-${user._id}`)?.style.setProperty('--value', minutes.toString());
            document.getElementById(`seconds-${user._id}`)?.style.setProperty('--value', seconds.toString());
        }
        , 1000)
    })
}