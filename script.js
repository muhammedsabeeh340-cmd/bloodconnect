// --- BACKEND CONFIGURATION ---
const API_BASE_URL = "http://127.0.0.1:5001/api";

const REGIONAL_DATA = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
    "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger (Monghyr)", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia (Purnea)", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chandigarh (UT)": ["Chandigarh"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada (South Bastar)", "Dhamtari", "Durg", "Gariyaband", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker (North Bastar)", "Kondagaon", "Korba", "Korea (Koriya)", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Dadra and Nagar Haveli (UT)": ["Dadra & Nagar Haveli"],
    "Daman and Diu (UT)": ["Daman", "Diu"],
    "Delhi (NCT)": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha (Palanpur)", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dangs (Ahwa)", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda (Nadiad)", "Mahisagar", "Mehsana", "Morbi", "Narmada (Rajpipla)", "Navsari", "Panchmahal (Godhra)", "Patan", "Porbandar", "Rajkot", "Sabarkantha (Himmatnagar)", "Surat", "Surendranagar", "Tapi (Vyara)", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Shimla", "Sirmaur (Sirmour)", "Solan", "Una"],
    "Jammu and Kashmir": ["Anantnag", "Bandipore", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru (Bangalore) Rural", "Bengaluru (Bangalore) Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru (Chikmagalur)", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada (Karwar)", "Vijayapura (Bijapur)", "Yadgir"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Lakshadweep (UT)": ["Agatti", "Amini", "Androth", "Bithra", "Chethlath", "Kavaratti", "Kadmath", "Kalpeni", "Kilthan", "Minicoy"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"],
    "Puducherry (UT)": ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr (Shahid Bhagat Singh Nagar)", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar (Mohali)", "Sangrur", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhoopalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal (Rural)", "Warangal (Urban)", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur - Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "RaeBareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Burdwan (Bardhaman)", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

document.addEventListener("DOMContentLoaded", () => {
    // Tab switching
    const tabRegister = document.getElementById("tab-register");
    const tabFind = document.getElementById("tab-find");
    const viewRegister = document.getElementById("view-register");
    const viewFind = document.getElementById("view-find");

    function setTabStyles(activeTab, inactiveTab) {
        activeTab.classList.replace("text-gray-500", "text-gray-900");
        activeTab.classList.replace("bg-transparent", "bg-white");
        activeTab.classList.add("shadow-sm");
        
        inactiveTab.classList.replace("text-gray-900", "text-gray-500");
        inactiveTab.classList.replace("bg-white", "bg-transparent");
        inactiveTab.classList.remove("shadow-sm");
    }

    tabRegister.addEventListener("click", () => {
        setTabStyles(tabRegister, tabFind);
        viewRegister.classList.replace("hidden", "block");
        viewFind.classList.replace("block", "hidden");
    });

    tabFind.addEventListener("click", () => {
        setTabStyles(tabFind, tabRegister);
        viewFind.classList.replace("hidden", "block");
        viewRegister.classList.replace("block", "hidden");
    });

    // --- Dynamic Dropdown Logic ---
    function setupRegionDropdowns(stateId, districtId) {
        const stateSelect = document.getElementById(stateId);
        const districtSelect = document.getElementById(districtId);

        // Populate states
        const sortedStates = Object.keys(REGIONAL_DATA).sort();
        sortedStates.forEach(state => {
            const opt = document.createElement("option");
            opt.value = state;
            opt.textContent = state;
            stateSelect.appendChild(opt);
        });

        stateSelect.addEventListener("change", () => {
            const selectedState = stateSelect.value;
            districtSelect.innerHTML = '<option value="" disabled selected>Select district</option>';
            
            if (selectedState && REGIONAL_DATA[selectedState]) {
                districtSelect.disabled = false;
                districtSelect.classList.replace("bg-gray-100", "bg-gray-50");
                districtSelect.classList.replace("text-gray-400", "text-gray-900");
                districtSelect.classList.remove("cursor-not-allowed");

                const sortedDistricts = REGIONAL_DATA[selectedState].sort();
                sortedDistricts.forEach(dist => {
                    const opt = document.createElement("option");
                    opt.value = dist.toLowerCase();
                    opt.textContent = dist;
                    districtSelect.appendChild(opt);
                });
            } else {
                districtSelect.disabled = true;
                districtSelect.classList.replace("bg-gray-50", "bg-gray-100");
                districtSelect.classList.replace("text-gray-900", "text-gray-400");
                districtSelect.classList.add("cursor-not-allowed");
                districtSelect.innerHTML = '<option value="" disabled selected>Select state first</option>';
            }
        });
    }

    setupRegionDropdowns("register-state", "register-district");
    setupRegionDropdowns("find-state", "find-district");

    // Handle Form Submissions & Node.js Backend Integration

    // 1. Register Form
    const formRegister = document.getElementById("form-register");
    const btnRegister = document.getElementById("btn-register");
    const registerStatus = document.getElementById("register-status");

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(formRegister);
        const donorData = {
            name: formData.get("name"),
            bloodGroup: formData.get("bloodGroup"),
            phone: formData.get("phone"),
            state: formData.get("state"),
            district: formData.get("district"),
            locality: formData.get("locality") || ""
        };

        const originalBtnText = btnRegister.innerHTML;
        setLoadingState(btnRegister, "Registering...");

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donorData)
            });

            if (!response.ok) throw new Error("Backend error");
            
            setSuccessState(btnRegister, "Success");
            showStatus(registerStatus, "Donor registered successfully!", "text-green-600");
            
            setTimeout(() => {
                resetBtnState(btnRegister, originalBtnText);
                formRegister.reset();
                // Reset district select after form reset
                const distSel = document.getElementById("register-district");
                distSel.disabled = true;
                distSel.classList.add("bg-gray-100", "text-gray-400", "cursor-not-allowed");
                distSel.innerHTML = '<option value="" disabled selected>Select state first</option>';
                registerStatus.classList.add("hidden");
            }, 3000);
            
        } catch (error) {
            resetBtnState(btnRegister, originalBtnText);
            showStatus(registerStatus, "Could not reach backend. Is server.js running?", "text-red-500");
            console.error(error);
        }
    });

    // 2. Find Form
    const formFind = document.getElementById("form-find");
    const btnSearch = document.getElementById("btn-search");
    const searchStatus = document.getElementById("search-status");
    const resultsContainer = document.getElementById("results-container");
    const resultsList = document.getElementById("results-list");

    formFind.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(formFind);
        const bloodGroup = formData.get("bloodGroup");
        const state = formData.get("state");
        const district = formData.get("district");
        const locality = formData.get("locality") || "";

        const originalBtnText = btnSearch.innerHTML;
        setLoadingState(btnSearch, "Searching...");
        resultsContainer.classList.add("hidden");

        let url = `${API_BASE_URL}/donors?bloodGroup=${encodeURIComponent(bloodGroup)}`;
        if (state) url += `&state=${encodeURIComponent(state)}`;
        if (district) url += `&district=${encodeURIComponent(district)}`;
        if (locality) url += `&locality=${encodeURIComponent(locality)}`;

        try {
            const response = await fetch(url);
            
            if (!response.ok) throw new Error("Search failed");
            const docs = await response.json();

            resetBtnState(btnSearch, originalBtnText);
            resultsList.innerHTML = "";

            if (docs.length === 0) {
                showStatus(searchStatus, "No matching donors found.", "text-gray-500");
            } else {
                searchStatus.classList.add("hidden");
                resultsContainer.classList.remove("hidden");
                
                docs.forEach(donor => {
                    const li = document.createElement("li");
                    li.className = "bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center";
                    const locationInfo = [donor.district, donor.state].filter(x => x).join(", ");
                    li.innerHTML = `
                        <div>
                            <p class="text-sm font-semibold text-gray-800">${donor.name} <span class="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded ml-2">${donor.bloodGroup}</span></p>
                            <p class="text-xs text-gray-500">${donor.locality || ""}${locationInfo ? (donor.locality ? " • " : "") + locationInfo : ""}</p>
                        </div>
                        <a href="tel:${donor.phone}" class="bg-brand text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-brand-hover">Call</a>
                    `;
                    resultsList.appendChild(li);
                });
            }
            
        } catch (error) {
            resetBtnState(btnSearch, originalBtnText);
            showStatus(searchStatus, "Error connecting to backend.", "text-red-500");
            console.error(error);
        }
    });

    // UI Helpers
    function setLoadingState(btn, text) {
        btn.disabled = true;
        btn.classList.add("opacity-75", "cursor-wait");
        btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ${text}`;
    }

    function setSuccessState(btn, text) {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-1"><polyline points="20 6 9 17 4 12"></polyline></svg> ${text}`;
        btn.classList.replace("bg-brand", "bg-emerald-600");
        btn.classList.replace("hover:bg-brand-hover", "hover:bg-emerald-700");
    }

    function resetBtnState(btn, originalHtml) {
        btn.disabled = false;
        btn.classList.remove("opacity-75", "cursor-wait");
        btn.innerHTML = originalHtml;
        btn.classList.replace("bg-emerald-600", "bg-brand");
        btn.classList.replace("hover:bg-emerald-700", "hover:bg-brand-hover");
    }

    function showStatus(elem, text, colorClass) {
        elem.className = `text-xs text-center font-medium mt-3 block ${colorClass}`;
        elem.textContent = text;
    }
});
