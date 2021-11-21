// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

/// @title Another Job Board
/// @author Caleb Tuttle
/// @notice Post jobs and apply to jobs on the job board.
contract JobBoard {

    struct JobPosting {
        uint id;
        address poster;
        string title;
        string description;
        address[] applicants;
    }

    // struct JobSeeker {
    //     string linkedIn;
    //     // TODO: add more??
    // }

    /// @notice The number of jobs that have been posted
    /// @dev Used to determine the id of a new JobPosting
    uint public jobCount;

    /// @dev Maps job id to JobPosting
    mapping(uint => JobPosting) public jobPostings;

    /// @dev Maps job seeker address to JobSeeker
    // mapping(address => JobSeeker) public jobSeekers;
    
    /// @dev Maps job seeker address to job seeker LinkedIn
    mapping(address => string) public jobSeekers;

    string[] public
    /// @notice Log that a job has been posted
    event PostJob(uint indexed jobId, address poster, string title);

    /// @notice Log that a job has been removed
    event RemoveJob(uint indexed jobId, address poster, string title);

    /// @notice Log that a job seeker has registered
    event RegisterJobSeeker(address indexed seeker);

    /// @notice Log that a job seeker has applied to a job
    event Apply(address applicant, uint jobId);


    constructor() public {
        jobCount = 1;
    }

    /// @notice Post a job to the job board
    /// @param _title The job title
    /// @param _description The job description
    function postJob(string memory _title, string memory _description) public {
        JobPosting storage newJob = jobPostings[jobCount];
        newJob.id = jobCount;
        newJob.poster = msg.sender;
        newJob.title = _title;
        newJob.description = _description;
        
        jobCount += 1;
        emit PostJob(newJob.id, msg.sender, _title);
    }

    /// @notice Remove a job from the job board
    /// @param jobId The id of the job to remove
    function removeJob(uint jobId) public {
        require(jobPostings[jobId].poster == msg.sender);
        string memory title = jobPostings[jobId].title;
        delete jobPostings[jobId];
        emit RemoveJob(jobId, msg.sender, title);
    }

    /// @notice View the attributes of a job posting (except its applicants)
    /// @param jobId The id of the job to view
    function getJob(uint jobId) public view returns(
        address poster,
        string memory title,
        string memory description
        ) 
    {
        require(jobPostings[jobId].poster != address(0));
        return (
            jobPostings[jobId].poster,
            jobPostings[jobId].title,
            jobPostings[jobId].description
        );
    }

    /// @notice View the LinkedIn URLs of the applicants to a job
    function viewApplicantLinkedIns(uint jobId) public view returns(string[] memory) {
        require(jobPostings[jobId].poster != address(0));
        address[] storage applicants = jobPostings[jobId].applicants;
        uint len = applicants.length;
        string[] storage linkedIns = new string(len);
        for (uint i = 0; i < jobPostings[jobId].applicants.length; i++) {
            linkedIns.push(jobSeekers[jobPostings[jobId].applicants[i]]);
        }
        return linkedIns;
    }

    /// @notice Apply to a job
    /// @param jobId The job id of the job to apply to
    function applyToJob(uint jobId, string memory _linkedIn) public {
        require(jobPostings[jobId].poster != address(0));

        // TODO: is there a better way to do this?
        // JobPosting storage posting = jobPostings[jobId];
        // for (uint i = 0; i < posting.applicants.length; i++) {
        //     assert(posting.applicants[i] != msg.sender);
        // }

        jobPostings[jobId].applicants.push(msg.sender);
        // jobSeekers[msg.sender] = JobSeeker({
        //     linkedIn: _linkedIn
        // });
        jobSeekers[msg.sender] = _linkedIn;
        emit Apply(msg.sender, jobId);
    }

}
