

\# FATaGYM — Requirements Documentation



\*\*Project:\*\* FATaGYM  

\*\*Course:\*\* Team Project  

\*\*University:\*\* University of Lodz  

\*\*Application Type:\*\* Web Application  

\*\*Development Methodology:\*\* Scrum  

\*\*Team Size:\*\* 4 Members  

\*\*Status:\*\* In Development



\---



\## 1. Project Overview



FATaGYM is an interactive fitness web application that combines human anatomy visualization with exercise information and personalized workout planning.



Users will be able to explore an interactive human body model, select muscle groups, and discover exercises targeting those muscles.



The application aims to make workout discovery easier, more visual, and accessible to users with different fitness experience levels.



The initial version will be developed using HTML, CSS, JavaScript, SVG, and JSON.



\## 2. Project Objectives



The main objectives of FATaGYM are:



\- Provide an interactive anatomical muscle map.

\- Allow users to select individual muscle groups.

\- Display exercises related to selected muscles.

\- Provide detailed exercise instructions.

\- Support both desktop and mobile devices.

\- Allow users to filter exercises.

\- Enable users to create and save personalized workout routines.



The primary objective of the Minimum Viable Product (MVP) is to provide a complete interaction flow:



1\. Open the FATaGYM website.

2\. Select a muscle group on the anatomical model.

3\. View exercises targeting that muscle.

4\. Select an exercise.

5\. View exercise instructions and details.



\## 3. Target Users



FATaGYM is intended for:



\- Beginners who want to learn about muscle groups.

\- Fitness enthusiasts looking for targeted exercises.

\- Gym users creating personalized workout routines.

\- People exercising at home with limited equipment.

\- Users interested in understanding human anatomy in relation to fitness.



\## 4. Functional Requirements



\### FR-01: Interactive Anatomy Map



The system shall display an interactive human anatomy map with front and back views.



Users shall be able to select muscle groups by clicking or tapping the corresponding anatomical regions.



The selected muscle shall be visually highlighted.



Supported muscle groups:



\- Chest

\- Back

\- Shoulders

\- Biceps

\- Triceps

\- Abs

\- Legs

\- Glutes



\### FR-02: Muscle Selection



The system shall identify the selected muscle group and communicate its identifier to the exercise module.



Only one muscle group shall remain highlighted at a time.



\### FR-03: Exercise Database



The system shall store exercise information in JSON files.



Each exercise shall contain:



\- Name

\- Target muscle group

\- Difficulty level

\- Required equipment

\- Recommended sets

\- Recommended repetitions

\- Rest time

\- Step-by-step instructions



Each supported muscle group should initially contain at least four to five exercises.



\### FR-04: Exercise List



The system shall display exercises associated with the selected muscle group.



Each exercise entry shall display its name, difficulty, and required equipment.



If no exercises are available, an appropriate message shall be shown.



\### FR-05: Exercise Details



Users shall be able to select an exercise and view:



\- Exercise name

\- Step-by-step instructions

\- Sets and repetitions

\- Rest duration

\- Required equipment

\- Difficulty level



\### FR-06: Exercise Filters



The system should allow users to filter exercises by:



\- Difficulty level

\- Equipment

\- Workout location (home or gym)



Multiple filters should be supported simultaneously.



\### FR-07: Custom Workout Builder



Users should be able to:



\- Add exercises to a custom workout.

\- View selected exercises.

\- Remove exercises from the workout.

\- Delete the complete workout.

\- Prevent duplicate exercise entries.



\### FR-08: Local Workout Storage



The application should use browser LocalStorage to save custom workout routines.



Saved workouts should remain available after the page is closed and reopened on the same browser.



\### FR-09: Workout Mode



If time permits, users may follow their workout routines step by step and mark completed sets.



\### FR-10: Progress Tracking



Future improvements may include workout history and basic progress statistics.



\---



\## 5. Non-Functional Requirements



\### NFR-01: Usability



The application shall provide a clear, intuitive, and easy-to-use interface.



\### NFR-02: Responsive Design



The website shall adapt to desktop, tablet, and mobile screen sizes.



\### NFR-03: Performance



The application should respond promptly to muscle selections and exercise interactions without unnecessary page reloads.



\### NFR-04: Compatibility



The application should function in modern browsers, including Chrome, Firefox, and Edge.



\### NFR-05: Maintainability



The source code shall be divided into separate HTML, CSS, JavaScript, and JSON files with clear responsibilities.



\### NFR-06: Data Consistency



Exercise data shall follow a standardized JSON structure.



Muscle identifiers must match between the anatomy module and the exercise database.



\### NFR-07: Accessibility



Interactive elements should be clearly labeled, visually distinguishable, and usable with common input methods.



\### NFR-08: Language



The initial application interface and exercise descriptions shall be in English.



\---



\## 6. MoSCoW Prioritization



\### Must Have



The first release requires:



\- Initial project structure

\- Homepage and design system

\- Responsive interface

\- Interactive front and back anatomy views

\- Clickable muscle groups

\- Selected muscle highlighting

\- Standardized exercise data

\- Exercise list and detail panel

\- Empty-state handling

\- Requirements documentation

\- Technical documentation

\- User manual

\- Sprint documentation



\### Should Have



Important features planned after the core functionality:



\- Exercise filters

\- Custom workout builder

\- LocalStorage persistence

\- Removing exercises and deleting workouts

\- Favorite exercises

\- Muscle name tooltips

\- UI animations and hover effects

\- Exercise images



\### Could Have



Optional features depending on available development time:



\- Workout mode

\- Rest timer

\- Workout history

\- Basic progress statistics

\- Exercise search

\- Light and dark theme switching



\### Won't Have (Current Release)



The following features are excluded from the current scope:



\- User registration and authentication

\- Cross-device workout synchronization

\- AI-generated workout recommendations

\- Exercise videos

\- Native mobile applications

\- Social networking features

\- Multi-language support



\---



\## 7. Technology Requirements



| Technology | Purpose |

|---|---|

| HTML5 | Application structure |

| CSS3 | Styling and responsive layouts |

| JavaScript | Application logic and interactivity |

| SVG | Interactive human anatomy visualization |

| JSON | Exercise data storage |

| LocalStorage | Local workout persistence |

| Git | Version control |

| GitHub | Team collaboration and source repository |

| Trello | Task and sprint management |



The initial application does not require a backend server or external database.



\## 8. Team Responsibilities



\### Ali — Muscle Map



Responsible for:

\- SVG anatomy views

\- Clickable muscle regions

\- Muscle selection events

\- Muscle highlighting

\- Front/back view switching



\### Feyza — Exercise Data and Display



Responsible for:

\- Standardized exercise JSON structure

\- Exercise data loading

\- Exercise lists

\- Exercise detail panel

\- Empty-state handling



\### Tamara — Interface and Design



Responsible for:

\- HTML page structure

\- CSS design system

\- Homepage

\- Responsive layouts

\- Shared interface components



\### Arda — Filters, Workout Builder and Storage



Responsible for:

\- Exercise filters

\- Custom workout builder

\- LocalStorage functionality

\- Workout management

\- Scrum coordination



All team members will contribute to exercise data and documentation.



\## 9. Development Methodology



FATaGYM will follow the Scrum methodology.



Development will be organized into two-week sprints.



The team will use:



\- Trello for task management.

\- MoSCoW for requirement prioritization.

\- Story Points for relative effort estimation.

\- GitHub for version control and collaboration.

\- Feature branches and Pull Requests for development.



Each sprint shall include:



\- One shared Sprint Backlog.

\- Tasks assigned to team members.

\- Individual Sprint Summaries.

\- A review of completed work.



\## 10. MVP Acceptance Criteria



The first functional version of FATaGYM will be considered ready when:



1\. The website loads successfully.

2\. Front and back anatomical views are available.

3\. Users can select supported muscle groups.

4\. The selected muscle is highlighted.

5\. Relevant exercises appear after muscle selection.

6\. Users can open exercise detail information.

7\. Missing exercise data is handled gracefully.

8\. The layout works on desktop and mobile screens.

9\. Exercise data follows the agreed JSON format.

10\. The application can be run locally without a backend.



\---



\## 11. Project Scope



FATaGYM is an educational university project intended to demonstrate web development, interactive user interfaces, modular JavaScript, data handling, and team collaboration.



The team will prioritize delivering a fully functional interactive anatomy and exercise discovery system before implementing advanced workout management features.



\---



\*\*FATaGYM — Explore Muscles. Discover Exercises. Build Your Workout.\*\*



