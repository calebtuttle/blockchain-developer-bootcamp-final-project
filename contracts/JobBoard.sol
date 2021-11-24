// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Another Job Board
/// @author Caleb Tuttle
/// @notice Post jobs and apply to jobs on the job board.
contract JobBoard is Ownable {

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

    /// @notice Log that all jobs have been removed
    event RemoveAllJobs();

    /// @notice Log that a job seeker has registered
    event RegisterJobSeeker(address indexed seeker);

    /// @notice Log that a job seeker has applied to a job
    event Apply(address applicant, uint jobId);


    constructor() {
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

    /// @notice Remove all jobs from the job board
    function removeAllJobs() public onlyOwner {
        for (uint i = 0; i < jobCount; i++) {
            if (jobPostings[i].poster != address(0)) {
                delete jobPostings[i];
            }
        }
        jobCount = 1;
        emit RemoveAllJobs();
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

    /// @notice View the eth addresses of the applicants to a job
    function viewApplicantAddresses(uint jobId) public view returns(address[] memory) {
        require(jobPostings[jobId].poster != address(0));
        return jobPostings[jobId].applicants;
    }

    /// @notice Apply to a job
    /// @param jobId The job id of the job to apply to
    function applyToJob(uint jobId, string memory _linkedIn) public {
        require(jobPostings[jobId].poster != address(0));

        jobPostings[jobId].applicants.push(msg.sender);
        jobSeekers[msg.sender] = JobSeeker({
            linkedIn: _linkedIn
        });
        emit Apply(msg.sender, jobId);
    }

}
