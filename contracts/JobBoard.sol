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

    struct JobSeeker {
        string linkedIn;
        // TODO: add more??
    }

    /// @notice The number of jobs that have been posted
    /// @dev Used to determine the id of a new JobPosting
    uint public jobCount;

    /// @dev Maps job id to JobPosting
    mapping(uint => JobPosting) public jobPostings;

    /// @dev Maps job seeker address to JobSeeker
    mapping(address => JobSeeker) public jobSeekers;


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

    /// @notice View the LinkedIn URLs of the applicants to a job
    function viewApplicantLinkedIns(uint jobId) public view returns(address[] memory) {
        require(jobPostings[jobId].poster != address(0));
        return jobPostings[jobId].applicants;
    }
    
    /// @notice Register as a job seeker
    /// @param _linkedIn The URL of the job seeker's LinkedIn
    function registerAsSeeker(string memory _linkedIn) public {
        require(keccak256(bytes(_linkedIn)) != keccak256(bytes("")));
        jobSeekers[msg.sender] = JobSeeker({
            linkedIn: _linkedIn
        });
        emit RegisterJobSeeker(msg.sender);
    }

    /// @notice Apply to a job
    /// @param jobId The job id of the job to apply to
    function applyToJob(uint jobId) public {
        require(jobPostings[jobId].poster != address(0));
        require(keccak256(bytes(jobSeekers[msg.sender].linkedIn)) != keccak256(bytes("")));

        // TODO: is there a better way to do this?
        JobPosting storage posting = jobPostings[jobId];
        for (uint i = 0; i < posting.applicants.length; i++) {
            assert(posting.applicants[i] != msg.sender);
        }

        jobPostings[jobId].applicants.push(msg.sender);
        emit Apply(msg.sender, jobId);
    }

}