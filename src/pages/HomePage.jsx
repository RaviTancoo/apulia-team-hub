import {Link} from "react-router-dom"
function HomePage() {
    return (
        <div className="homepage">

            <h1 className="homepage__heading">APULIA Solutions Hub</h1>

            <p className="homepage__text">
                The APULIA Solutions Team Hub is your central workspace for exploring the people,
                skills, and certifications that power our organization.
            </p>

            <p className="homepage__text">
                This platform allows you to browse team members, view detailed professional profiles,
                and track industry certifications in one streamlined system.
            </p>

            <p className="homepage__text">
                Whether you're looking for expertise in software development, network engineering,
                or administrative support, the directory helps you quickly find the right person for the job.
            </p>

            <Link to="/members" className="homepage__button">
                Meet the Team
            </Link>

        </div>
    )
}

export default HomePage

