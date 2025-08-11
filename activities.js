        $(document).ready(function() {
            const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
            const emailModal = new bootstrap.Modal(document.getElementById('emailModal'));
            let selectedActivities = [];
            
            // Initialize tooltips
            $('[data-bs-toggle="tooltip"]').tooltip();

            // User interaction with table cells
            $("td").click(function() {
                var content = $(this).text();
                var columnHeader = $(this).parent().find('td:first').text();
                var rowHeader = $(this).closest('table').find('th').eq($(this).index()).text();

                if (content != "Not Available") {
                    $(this).toggleClass("tdhighlight");

                    if ($(this).hasClass("tdhighlight")) {
                        // Add to selected activities
                        selectedActivities.push({
                            activity: columnHeader,
                            location: rowHeader,
                            name: content
                        });
                    } else {
                        // Remove from selected activities
                        selectedActivities = selectedActivities.filter(item => 
                            item.name !== content
                        );
                    }

                    updateSelectedActivitiesModal();
                    
                    // Show modal if there are selected activities
                    if (selectedActivities.length > 0) {
                        activityModal.show();
                    } else {
                        activityModal.hide();
                    }
                }
            });

            function updateSelectedActivitiesModal() {
                const modalBody = $('#selectedActivitiesList');
                modalBody.empty();
                
                if (selectedActivities.length === 0) {
                    modalBody.append('<p>No activities selected</p>');
                    return;
                }
                
                selectedActivities.forEach(activity => {
                    modalBody.append(`
                        <div class="selected-activity">
                            <strong>${activity.name}</strong> at ${activity.location}
                        </div>
                    `);
                });
            }

            // Handle Enquire button click
            $('#enquireBtn').click(function() {
                activityModal.hide();
                emailModal.show();
            });

            // Handle Submit Email button click
            $('#submitEmailBtn').click(function() {
                const email = $('#userEmail').val();
                if (email && email.includes('@')) {
                    alert("Thank you! We'll send information about your selected activities to " + email);
                    emailModal.hide();
                    // Clear selections
                    $('.tdhighlight').removeClass('tdhighlight');
                    selectedActivities = [];
                    updateSelectedActivitiesModal();
                } else {
                    alert("Please enter a valid email address");
                }
            });
        });