        function updateClock() {
            const d = new Date();
            let hours = d.getHours();
            const minutes = d.getMinutes().toString().padStart(2, '0');
            const seconds = d.getSeconds().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            // Convert to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            
            // Time zone calculation - fixed GMT calculation
            const utchr = d.getUTCHours();
            const localHour = d.getHours();
            let timeDiff = localHour - utchr;
            
            // Adjust for crossing midnight
            if (timeDiff < -12) timeDiff += 24;
            else if (timeDiff > 12) timeDiff -= 24;
            
            let timeZone;
            
            // Determine time zone
            if (timeDiff === -7 || timeDiff === 17) timeZone = "PT";
            else if (timeDiff === -6 || timeDiff === 18) timeZone = "MT";
            else if (timeDiff === -5 || timeDiff === 19) timeZone = "CT";
            else if (timeDiff === -4 || timeDiff === 20) timeZone = "ET";
            else timeZone = "GMT" + (timeDiff >= 0 ? "+" + timeDiff : timeDiff);
            
            const timeString = `Your Current Local Time: ${hours}:${minutes}:${seconds} ${ampm} (${timeZone})`;
            document.getElementById('digital-clock').textContent = timeString;
            
            setTimeout(updateClock, 1000);
        }
        
        // Start the clock when the page loads
        window.onload = function() {
            updateClock();
        };