# Table of Contents

| Section | Title | Page |
|---------|-------|------|
| | REVISION HISTORY | II |
| 1. | INTRODUCTION | 1 |
| 1.1 | Purpose | 1 |
| 1.2 | Scope | 1 |
| 1.3 | Definitions, Acronyms, and Abbreviations | 1 |
| 1.4 | References | 1 |
| 1.5 | Overview | 1 |
| 2. | GENERAL DESCRIPTION | 2 |
| 2.1 | Product Perspective | 2 |
| 2.2 | Product Functions | 2 |
| 2.3 | User Characteristics | 2 |
| 2.4 | General Constraints | 2 |
| 2.5 | Assumptions and Dependencies | 2 |
| 3. | SPECIFIC REQUIREMENTS | 3 |
| 3.1 | External Interface Requirements | 3 |
| 3.1.1 | User Interfaces | 3 |
| 3.1.2 | Hardware Interfaces | 3 |
| 3.1.3 | Software Interfaces | 3 |
| 3.1.4 | Communications Interfaces | 3 |
| 3.2 | Functional Requirements | 4 |
| 3.2.1 | User Authentication | 4 |
| 3.2.2 | Project/Gig Management | 4 |
| 3.2.3 | Proposal System | 5 |
| 3.2.4 | Order Management | 5 |
| 3.2.5 | Real-Time Messaging | 6 |
| 3.2.6 | User Dashboard | 6 |
| 3.5 | Non-Functional Requirements | 7 |
| 3.5.1 | Performance | 7 |
| 3.5.2 | Reliability | 7 |
| 3.5.3 | Availability | 7 |
| 3.5.4 | Security | 7 |
| 3.5.5 | Maintainability | 7 |
| 3.5.6 | Portability | 8 |
| 3.7 | Design Constraints | 8 |
| 3.9 | Other Requirements | 8 |
| 4. | ANALYSIS MODELS | 9 |
| 4.1 | Data Flow Diagrams (DFD) | 9 |
| 5. | GITHUB LINK | 10 |
| 6. | DEPLOYED LINK | 11 |
| 7. | CLIENT APPROVAL PROOF | 12 |
| 8. | CLIENT LOCATION PROOF | 13 |
| 9. | TRANSACTION ID PROOF | 14 |
| 10. | EMAIL ACKNOWLEDGEMENT | 15 |
| 11. | GST No. | 16 |
| A. | APPENDICES | 17 |
| A.1 | Appendix 1: Database Schema | 17 |
| A.2 | Appendix 2: API Endpoints | 18 |

---

# REVISION HISTORY

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | December 2024 | Abhishak Chaturvedi | Initial SRS Document Creation |
| 1.1 | December 2024 | Abhishak Chaturvedi | Added Real-Time Features and Socket.IO Integration |
| 1.2 | December 2024 | Abhishak Chaturvedi | Final Review and Documentation Update |

---

# 1. INTRODUCTION

The Software Requirements Specification (SRS) document provides a comprehensive description of the getWork Freelancer Marketplace Platform. This document serves as a formal agreement between the development team and stakeholders, outlining the functional and non-functional requirements necessary to design, develop, and deploy the application successfully.

## 1.1 Purpose

The purpose of this Software Requirements Specification document is to provide a detailed description of the getWork Freelancer Marketplace Platform. This document will serve as a reference for:

1. **Development Team**: To understand the complete system requirements and guide the implementation process.
2. **Project Stakeholders**: To validate that the proposed system meets business objectives and user needs.
3. **Quality Assurance Team**: To develop comprehensive test cases and ensure the system meets specified requirements.
4. **Maintenance Team**: To understand the system architecture for future enhancements and bug fixes.

The intended audience includes software developers, project managers, quality assurance engineers, and business analysts involved in the development and deployment of the getWork platform.

## 1.2 Scope

**Product Name**: getWork - Freelancer Marketplace Platform

**Product Description**: getWork is a full-stack web application that serves as a digital marketplace connecting skilled freelancers with clients seeking professional services. The platform facilitates the entire freelancing workflow from project posting to order completion.

**What the Software Will Do**:
- Enable clients to post projects and hire freelancers
- Allow freelancers to browse projects and submit proposals
- Provide real-time messaging between users
- Manage the complete order lifecycle from creation to completion
- Display comprehensive dashboards with real-time statistics
- Handle user authentication and profile management

**What the Software Will Not Do**:
- Process actual financial transactions (payment gateway integration is out of scope)
- Provide video calling or screen sharing capabilities
- Offer mobile native applications (web-responsive only)

**Benefits and Objectives**:
1. Reduce friction in the freelancer hiring process by 60% compared to traditional methods
2. Provide real-time communication with message delivery under 500ms
3. Enable order tracking with instant status updates
4. Support a minimum of 1000 concurrent users without performance degradation

## 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| MERN | MongoDB, Express.js, React.js, Node.js - Technology Stack |
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| CRUD | Create, Read, Update, Delete |
| UI | User Interface |
| UX | User Experience |
| JWT | JSON Web Token |
| CORS | Cross-Origin Resource Sharing |
| DFD | Data Flow Diagram |
| Gig | A project or service offering posted on the platform |
| Proposal | A freelancer's application to work on a client's project |
| Order | A confirmed work agreement between client and freelancer |
| Socket.IO | Real-time bidirectional event-based communication library |
| Mongoose | MongoDB object data modeling library for Node.js |
| Vite | Next-generation frontend build tool |
| Tailwind CSS | Utility-first CSS framework |

## 1.4 References

| Document | Description | Source |
|----------|-------------|--------|
| IEEE Std 830-1998 | IEEE Recommended Practice for Software Requirements Specifications | IEEE Standards Association |
| MongoDB Documentation | Official MongoDB database documentation | https://docs.mongodb.com |
| Express.js Documentation | Official Express.js web framework documentation | https://expressjs.com |
| React.js Documentation | Official React.js library documentation | https://react.dev |
| Node.js Documentation | Official Node.js runtime documentation | https://nodejs.org/docs |
| Socket.IO Documentation | Real-time communication library documentation | https://socket.io/docs |
| Tailwind CSS Documentation | Utility-first CSS framework documentation | https://tailwindcss.com/docs |

## 1.5 Overview

This Software Requirements Specification document is organized into the following sections:

**Section 2 - General Description**: Provides background information about the product, including product perspective, functions, user characteristics, constraints, and dependencies.

**Section 3 - Specific Requirements**: Contains detailed functional and non-functional requirements, including external interface requirements, feature specifications, performance criteria, and design constraints.

**Section 4 - Analysis Models**: Presents visual models including Data Flow Diagrams that illustrate system processes and data movement.

**Sections 5-11**: Contains project artifacts including repository links, deployment information, and client documentation.

**Appendices**: Provides supplementary information including database schemas and API endpoint documentation.

---

# 2. GENERAL DESCRIPTION

This section provides a high-level overview of the getWork platform, describing the context in which the system operates and the general factors that affect its requirements.

## 2.1 Product Perspective

getWork is a standalone web-based application designed to operate as a freelancer marketplace platform. The system is positioned within the broader context of the gig economy, providing an alternative to established platforms such as Fiverr, Upwork, and Freelancer.com.

**System Context**:
- The application operates as a client-server architecture with a React.js frontend communicating with a Node.js/Express.js backend
- Data persistence is handled through MongoDB, a NoSQL document database
- Real-time features are powered by Socket.IO for bidirectional communication
- The system is designed to be deployed on cloud infrastructure

**System Interfaces**:
1. **Web Browser Interface**: Users interact with the system through modern web browsers
2. **Database Interface**: MongoDB serves as the primary data store
3. **Email Interface**: For notifications and communication (future enhancement)

**Relationship to Other Products**:
The getWork platform is an independent system that does not directly interface with other marketplace platforms. However, it is designed with extensibility in mind to potentially integrate with:
- Payment gateways (Stripe, PayPal)
- Email services (SendGrid, Mailgun)
- Cloud storage (AWS S3, Cloudinary)

## 2.2 Product Functions

The getWork platform provides the following major functions:

**User Management**:
- User registration with role selection (Client/Freelancer)
- Session-based authentication and authorization
- Profile creation and management
- Skill and portfolio management

**Project Management**:
- Project creation with detailed specifications
- Category-based project organization
- Project browsing with search and filter capabilities
- Project status tracking (Open, In Progress, Completed, Cancelled)

**Proposal System**:
- Proposal submission by freelancers
- Proposal review and acceptance by clients
- Automatic order creation upon proposal acceptance
- Proposal status tracking

**Order Management**:
- Order creation and tracking
- Status updates (Pending, In Progress, Completed, Cancelled)
- Order history and analytics
- Role-based status modification permissions

**Communication System**:
- Real-time one-to-one messaging
- Message history and conversation management
- Typing indicators and read receipts
- Unread message notifications

**Dashboard and Analytics**:
- Real-time statistics display
- Active orders tracking
- Earnings overview
- Recommendation system for gigs

## 2.3 User Characteristics

The getWork platform is designed for two primary user types:

**Clients**:
- Individuals or businesses seeking freelance services
- Varying technical expertise from beginner to advanced
- Primary goals: Post projects, hire freelancers, manage orders
- Expected to have basic computer literacy and web browsing skills
- Age range: 18-65 years

**Freelancers**:
- Professionals offering services in various categories
- Technical expertise varies based on service type
- Primary goals: Find projects, submit proposals, complete orders, build reputation
- Expected to have intermediate to advanced computer skills
- Age range: 18-55 years

**Administrators** (Future Enhancement):
- Platform moderators and support staff
- Advanced technical skills required
- Responsible for user management, dispute resolution, and platform maintenance

## 2.4 General Constraints

The following constraints affect the design and implementation of the getWork platform:

1. **Technology Stack Constraints**: The application must be built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO for real-time features.

2. **Browser Compatibility**: The application must support modern web browsers including Chrome (v90+), Firefox (v88+), Safari (v14+), and Edge (v90+).

3. **Responsive Design**: The user interface must be responsive and functional on devices with screen widths ranging from 320px to 2560px.

4. **Session-Based Authentication**: The system must use session-based authentication rather than token-based (JWT) authentication.

5. **No External Payment Processing**: The current version does not include integrated payment processing.

6. **Code Simplicity**: The codebase must avoid complex or advanced patterns, maintaining readability for educational purposes.

7. **Single Language**: All code documentation and comments must be in English.

## 2.5 Assumptions and Dependencies

**Assumptions**:

1. Users have access to a stable internet connection with minimum speed of 1 Mbps.
2. Users access the application through modern web browsers with JavaScript enabled.
3. The MongoDB database service will maintain 99.9% uptime.
4. Users will provide valid email addresses during registration.
5. The hosting environment supports Node.js version 16 or higher.

**Dependencies**:

| Dependency | Version | Purpose |
|------------|---------|---------|
| Node.js | v16+ | Server runtime environment |
| MongoDB | v5.0+ | Database storage |
| React | v18.2.0 | Frontend UI library |
| Express.js | v4.x | Backend web framework |
| Socket.IO | v4.x | Real-time communication |
| Mongoose | v7.x | MongoDB ODM |
| Tailwind CSS | v3.3.5 | CSS framework |
| Vite | v7.x | Build tool |

---

# 3. SPECIFIC REQUIREMENTS

This section contains all software requirements at a level of detail sufficient to enable designers to design a system that satisfies those requirements. Each requirement is uniquely identifiable, verifiable, and traceable.

## 3.1 External Interface Requirements

### 3.1.1 User Interfaces

**UI-001: Landing Page**
- The system shall display a hero section with search functionality
- The system shall display category cards for service browsing
- The system shall display featured/popular services
- The system shall display platform statistics
- The system shall display customer testimonials
- The system shall display call-to-action sections for user registration

**UI-002: Navigation Interface**
- The system shall provide a persistent navigation bar on all pages
- The navigation shall include links to: Home, Explore, Dashboard (authenticated), Profile (authenticated)
- The navigation shall display user avatar and name when authenticated
- The navigation shall provide login/register buttons for unauthenticated users

**UI-003: Dashboard Interface**
- The system shall display stat cards for: Active Orders, Unread Messages, Total Earnings
- The system shall display a list of active orders with status indicators
- The system shall display pending proposals requiring action
- The system shall display recommended gigs based on user activity

**UI-004: Messaging Interface**
- The system shall display a conversation list on the left panel
- The system shall display chat history in the center panel
- The system shall provide a message input field with send button
- The system shall display typing indicators when the other user is typing
- The system shall mark messages as read automatically when viewed

**UI-005: Form Interfaces**
- All forms shall provide real-time validation feedback
- All forms shall display clear error messages below invalid fields
- All forms shall indicate required fields with an asterisk (*)
- All buttons shall display loading states during form submission

### 3.1.2 Hardware Interfaces

**HW-001: Client Hardware Requirements**
- The system shall operate on any device capable of running a modern web browser
- Minimum hardware specifications:
  - Processor: 1 GHz or faster
  - RAM: 2 GB minimum
  - Display: 320px minimum width
  - Internet: 1 Mbps connection speed

**HW-002: Server Hardware Requirements**
- The server shall operate on cloud infrastructure with:
  - Processor: 2 vCPUs minimum
  - RAM: 4 GB minimum
  - Storage: 20 GB SSD minimum
  - Network: 100 Mbps bandwidth

### 3.1.3 Software Interfaces

**SW-001: Database Interface**
- The system shall interface with MongoDB database version 5.0 or higher
- The connection shall use the Mongoose ODM library version 7.x
- The system shall support MongoDB Atlas cloud database service
- The system shall support local MongoDB installations

**SW-002: Frontend-Backend Interface**
- The frontend shall communicate with the backend via RESTful API endpoints
- All API calls shall use JSON format for request and response bodies
- The API base URL shall be configurable via environment variables
- All API responses shall include success status and appropriate HTTP status codes

**SW-003: Real-Time Communication Interface**
- The system shall use Socket.IO for real-time features
- Socket connections shall use WebSocket protocol with HTTP long-polling fallback
- The Socket.IO server shall operate on the same port as the Express server

### 3.1.4 Communications Interfaces

**CI-001: HTTP/HTTPS Protocol**
- All client-server communication shall use HTTP/HTTPS protocols
- The system shall support CORS for cross-origin requests
- API endpoints shall accept requests from configured allowed origins

**CI-002: WebSocket Protocol**
- Real-time features shall use WebSocket protocol
- Socket connections shall authenticate using session cookies
- Socket events shall follow a namespace-based organization

## 3.2 Functional Requirements

### 3.2.1 User Authentication

**FR-AUTH-001: User Registration**
- Introduction: The system shall allow new users to create accounts on the platform.
- Inputs:
  - Full Name (string, 2-100 characters, required)
  - Email Address (valid email format, required, unique)
  - Password (minimum 6 characters, required)
  - User Type (enum: 'client' or 'freelancer', required)
- Processing:
  - Validate all input fields
  - Check for existing email address
  - Create user record in database
  - Create session for the new user
- Outputs:
  - Success: User object with session cookie
  - Redirect to dashboard page
- Error Handling:
  - Display "Email already registered" for duplicate emails
  - Display validation errors for invalid inputs

**FR-AUTH-002: User Login**
- Introduction: The system shall authenticate existing users.
- Inputs:
  - Email Address (valid email format, required)
  - Password (string, required)
- Processing:
  - Validate input fields
  - Find user by email in database
  - Verify password match
  - Create session for the user
- Outputs:
  - Success: User object with session cookie
  - Redirect to dashboard page
- Error Handling:
  - Display generic "Invalid email or password" message (security measure)
  - Prevent user enumeration attacks

**FR-AUTH-003: User Logout**
- Introduction: The system shall allow users to terminate their sessions.
- Inputs: None (uses session cookie)
- Processing:
  - Destroy server-side session
  - Clear session cookie
- Outputs:
  - Success confirmation
  - Redirect to home page
- Error Handling:
  - Handle expired sessions gracefully

**FR-AUTH-004: Session Persistence**
- Introduction: The system shall maintain user sessions across browser sessions.
- Processing:
  - Sessions shall persist for 7 days
  - Session data shall be stored server-side
  - Session ID shall be transmitted via HTTP-only cookie
- Error Handling:
  - Redirect to login page for expired sessions

### 3.2.2 Project/Gig Management

**FR-PROJ-001: Create Project**
- Introduction: The system shall allow clients to create new project listings.
- Inputs:
  - Title (string, 5-200 characters, required)
  - Description (string, 20-5000 characters, required)
  - Category (reference to Category, required)
  - Budget Type (enum: 'fixed' or 'range', required)
  - Budget Amount (number, required based on budget type)
  - Duration (number with unit, required)
  - Skills Required (array of strings, optional)
  - Images (array of URLs, optional, max 5)
- Processing:
  - Validate user is authenticated
  - Validate user type is 'client'
  - Validate all input fields
  - Create project record with status 'open'
- Outputs:
  - Success: Created project object
- Error Handling:
  - Return 401 for unauthenticated users
  - Return 403 for non-client users
  - Return 400 for validation errors

**FR-PROJ-002: Browse Projects**
- Introduction: The system shall allow users to browse and search for projects.
- Inputs:
  - Category filter (optional)
  - Search query (optional)
  - Status filter (optional)
  - Page number (optional, default 1)
  - Limit (optional, default 10, max 50)
- Processing:
  - Apply filters to database query
  - Paginate results
  - Sort by creation date (newest first)
- Outputs:
  - Array of project objects
  - Total count and pagination metadata
- Error Handling:
  - Enforce maximum limit of 50 to prevent DoS attacks

**FR-PROJ-003: View Project Details**
- Introduction: The system shall display detailed information about a specific project.
- Inputs:
  - Project ID (MongoDB ObjectId)
- Processing:
  - Fetch project from database
  - Populate client information
- Outputs:
  - Complete project object with client details
- Error Handling:
  - Return 404 for non-existent projects

### 3.2.3 Proposal System

**FR-PROP-001: Submit Proposal**
- Introduction: The system shall allow freelancers to apply for projects.
- Inputs:
  - Project/Gig ID (required)
  - Message (optional)
- Processing:
  - Validate user is authenticated freelancer
  - Check user has not already applied
  - Verify project is still open
  - Create proposal with status 'pending'
- Outputs:
  - Success: Created proposal object
- Error Handling:
  - Return 400 if already applied
  - Return 400 if project is not open

**FR-PROP-002: Accept Proposal**
- Introduction: The system shall allow clients to accept freelancer proposals.
- Inputs:
  - Proposal ID (required)
- Processing:
  - Validate user is the project owner
  - Update proposal status to 'accepted'
  - Create new order automatically
  - Update project status to 'in_progress'
- Outputs:
  - Success: Updated proposal and created order
- Error Handling:
  - Return 403 for non-owners
  - Return 400 for already processed proposals

**FR-PROP-003: Reject Proposal**
- Introduction: The system shall allow clients to reject freelancer proposals.
- Inputs:
  - Proposal ID (required)
- Processing:
  - Validate user is the project owner
  - Update proposal status to 'rejected'
- Outputs:
  - Success confirmation
- Error Handling:
  - Return 403 for non-owners

### 3.2.4 Order Management

**FR-ORD-001: View Orders**
- Introduction: The system shall display user's orders based on their role.
- Inputs:
  - Status filter (optional)
- Processing:
  - Fetch orders where user is client or freelancer
  - Apply status filter if provided
  - Sort by creation date (newest first)
- Outputs:
  - Array of order objects with project and user details
- Error Handling:
  - Return empty array if no orders found

**FR-ORD-002: Update Order Status**
- Introduction: The system shall allow authorized users to update order status.
- Inputs:
  - Order ID (required)
  - New Status (enum: 'in_progress', 'completed', 'cancelled')
- Processing:
  - Validate user role permissions:
    - Only freelancer can set 'in_progress'
    - Only client can set 'completed' or 'cancelled'
  - Update order status in database
  - Emit real-time socket event
- Outputs:
  - Success: Updated order object
- Error Handling:
  - Return 403 for unauthorized status changes
  - Return 400 for invalid status values

**FR-ORD-003: Real-Time Order Updates**
- Introduction: The system shall broadcast order changes in real-time.
- Processing:
  - Emit 'order:update' socket event on status change
  - Emit 'dashboard:refresh' event for dashboard updates
  - Target relevant user rooms
- Outputs:
  - Socket events to connected clients

### 3.2.5 Real-Time Messaging

**FR-MSG-001: Send Message**
- Introduction: The system shall allow users to send real-time messages.
- Inputs:
  - Recipient ID (required)
  - Message Text (string, 1-5000 characters, required)
- Processing:
  - Validate both users exist
  - Store message in database
  - Emit socket event to recipient's room
- Outputs:
  - Created message object
  - Real-time delivery to recipient
- Error Handling:
  - Return 400 for empty messages
  - Return 404 for invalid recipient

**FR-MSG-002: View Conversations**
- Introduction: The system shall display all user conversations.
- Processing:
  - Aggregate unique conversation partners
  - Include last message preview
  - Include unread count per conversation
  - Sort by last message time
- Outputs:
  - Array of conversation objects
- Error Handling:
  - Return empty array for new users

**FR-MSG-003: View Chat History**
- Introduction: The system shall display message history with a specific user.
- Inputs:
  - Other User ID (required)
- Processing:
  - Fetch all messages between the two users
  - Mark unread messages as read
  - Sort by timestamp (oldest first)
- Outputs:
  - Array of message objects
- Error Handling:
  - Return 404 for invalid user ID

**FR-MSG-004: Typing Indicators**
- Introduction: The system shall show when users are typing.
- Processing:
  - Emit 'typing:start' when user begins typing
  - Emit 'typing:stop' when user stops typing
  - Display indicator to recipient in real-time
- Outputs:
  - Socket events to recipient's room

### 3.2.6 User Dashboard

**FR-DASH-001: Display Statistics**
- Introduction: The system shall display user-specific statistics.
- Processing:
  - Calculate active orders count
  - Calculate unread messages count
  - Calculate total earnings (for freelancers)
- Outputs:
  - Statistics object with counts and totals
- Error Handling:
  - Return zero values for new users

**FR-DASH-002: Real-Time Dashboard Updates**
- Introduction: The system shall update dashboard statistics in real-time.
- Processing:
  - Listen for 'dashboard:refresh' socket events
  - Refresh statistics on event receipt
  - Update UI without page reload
- Outputs:
  - Updated statistics display

**FR-DASH-003: Display Pending Proposals**
- Introduction: The system shall display proposals requiring client action.
- Processing:
  - Fetch proposals for user's projects with 'pending' status
  - Include freelancer information
- Outputs:
  - Array of pending proposal objects

## 3.5 Non-Functional Requirements

### 3.5.1 Performance

**NFR-PERF-001**: The system shall load the initial landing page within 3 seconds on a 3G connection.

**NFR-PERF-002**: API response times shall not exceed 500ms for 95% of requests under normal load.

**NFR-PERF-003**: Real-time messages shall be delivered within 200ms under normal network conditions.

**NFR-PERF-004**: The system shall support a minimum of 1000 concurrent users without degradation.

**NFR-PERF-005**: Database queries shall complete within 100ms for simple operations and 500ms for complex aggregations.

### 3.5.2 Reliability

**NFR-REL-001**: The system shall have a Mean Time Between Failures (MTBF) of at least 720 hours (30 days).

**NFR-REL-002**: The system shall automatically reconnect Socket.IO connections within 5 seconds of disconnection.

**NFR-REL-003**: The system shall preserve user session data across server restarts.

**NFR-REL-004**: The system shall implement error boundaries to prevent complete UI crashes.

### 3.5.3 Availability

**NFR-AVAIL-001**: The system shall maintain 99.5% uptime on a monthly basis.

**NFR-AVAIL-002**: Planned maintenance windows shall not exceed 4 hours per month.

**NFR-AVAIL-003**: The system shall implement graceful degradation when external services are unavailable.

### 3.5.4 Security

**NFR-SEC-001**: All session cookies shall be HTTP-only to prevent XSS attacks.

**NFR-SEC-002**: The system shall implement CORS restrictions to allow only specified origins.

**NFR-SEC-003**: Login error messages shall be generic to prevent user enumeration attacks.

**NFR-SEC-004**: The newsletter subscriber list shall be protected by authentication.

**NFR-SEC-005**: Role-based access control shall be enforced for all protected operations.

**NFR-SEC-006**: Input validation shall be performed on both client and server sides.

**NFR-SEC-007**: API rate limiting shall be implemented to prevent abuse (future enhancement).

### 3.5.5 Maintainability

**NFR-MAINT-001**: Code shall follow consistent naming conventions and formatting.

**NFR-MAINT-002**: All files shall include descriptive header comments explaining their purpose.

**NFR-MAINT-003**: Complex logic shall be documented with inline comments.

**NFR-MAINT-004**: The codebase shall use simple, readable patterns avoiding over-engineering.

**NFR-MAINT-005**: Database models shall include field-level validation and documentation.

### 3.5.6 Portability

**NFR-PORT-001**: The frontend shall be responsive across devices from 320px to 2560px width.

**NFR-PORT-002**: The application shall function correctly on Chrome, Firefox, Safari, and Edge browsers.

**NFR-PORT-003**: Environment configuration shall be externalized to support different deployment targets.

**NFR-PORT-004**: The application shall operate on both Windows and Linux server environments.

## 3.7 Design Constraints

**DC-001: Technology Stack**
The application must be built using:
- Frontend: React 18, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ODM
- Real-time: Socket.IO

**DC-002: Code Simplicity**
The codebase must avoid advanced patterns such as:
- Complex state management libraries (Redux, MobX)
- Advanced TypeScript features
- GraphQL
- Microservices architecture

**DC-003: Session-Based Authentication**
The system must use session-based authentication instead of JWT tokens.

**DC-004: Monolithic Architecture**
The application shall follow a monolithic architecture with clear separation of concerns.

**DC-005: RESTful API Design**
All API endpoints shall follow REST conventions for resource naming and HTTP methods.

## 3.9 Other Requirements

**OR-001: Documentation**
All code files shall include comprehensive comments explaining functionality.

**OR-002: Environment Configuration**
Sensitive configuration (database URLs, secrets) shall be stored in environment variables.

**OR-003: Error Logging**
The system shall log all errors to the console with meaningful error messages.

**OR-004: Database Indexing**
Frequently queried fields shall have appropriate database indexes for performance.

---

# 4. ANALYSIS MODELS

This section presents visual models that illustrate the system's structure and behavior.

## 4.1 Data Flow Diagrams (DFD)

### Level 0: Context Diagram

**Description**: The Context Diagram shows the getWork system as a single process with its external entities.

```
+------------------+
|     CLIENT       |
|     (User)       |
+--------+---------+
         |
         | Project Requests, Proposals, Messages
         v
+--------+---------+
|                  |
|    getWork       |
|    SYSTEM        |
|                  |
+--------+---------+
         |
         | Data Storage/Retrieval
         v
+--------+---------+
|    MongoDB       |
|    DATABASE      |
+------------------+
```

**External Entities**:
1. **Client/User**: Represents both clients and freelancers who interact with the system through web browsers.
2. **MongoDB Database**: The external data store that persists all application data.

**Data Flows**:
- Users send requests (authentication, projects, proposals, messages) to the system
- The system responds with requested data and confirmations
- The system reads from and writes to the database

### Level 1: Main Process Decomposition

**Description**: The Level 1 DFD decomposes the getWork system into major functional subsystems.

```
                    +-------------+
                    |    USER     |
                    +------+------+
                           |
        +------------------+------------------+
        |                  |                  |
        v                  v                  v
+-------+------+   +-------+------+   +-------+------+
|   1.0        |   |   2.0        |   |   3.0        |
| AUTHENTICATION|  | PROJECT      |   | MESSAGING    |
| SUBSYSTEM    |   | MANAGEMENT   |   | SUBSYSTEM    |
+-------+------+   +-------+------+   +-------+------+
        |                  |                  |
        v                  v                  v
+-------+------+   +-------+------+   +-------+------+
|   4.0        |   |   5.0        |   |   6.0        |
| PROPOSAL     |   | ORDER        |   | DASHBOARD    |
| SUBSYSTEM    |   | MANAGEMENT   |   | SUBSYSTEM    |
+-------+------+   +-------+------+   +-------+------+
        |                  |                  |
        +------------------+------------------+
                           |
                           v
                    +------+------+
                    |  DATABASE   |
                    +-------------+
```

**Process Descriptions**:

1. **Authentication Subsystem (1.0)**: Handles user registration, login, logout, and session management.

2. **Project Management Subsystem (2.0)**: Manages project creation, browsing, updating, and deletion.

3. **Messaging Subsystem (3.0)**: Handles real-time messaging between users, including send, receive, and history retrieval.

4. **Proposal Subsystem (4.0)**: Manages proposal creation, acceptance, and rejection workflows.

5. **Order Management Subsystem (5.0)**: Handles order lifecycle from creation to completion.

6. **Dashboard Subsystem (6.0)**: Aggregates and displays user statistics and recommendations.

### Level 2: Authentication Subsystem Detail

**Description**: Detailed view of the Authentication Subsystem processes.

```
+-------------+
|    USER     |
+------+------+
       |
       | Credentials
       v
+------+------+
|   1.1       |
|  VALIDATE   |
|  INPUT      |
+------+------+
       |
       | Valid Data
       v
+------+------+
|   1.2       |
|  VERIFY     +---------> Session Cookie
|  CREDENTIALS|            to User
+------+------+
       |
       | User Record
       v
+------+------+
|   1.3       |
|  CREATE/    |
|  MANAGE     |
|  SESSION    |
+------+------+
       |
       v
+------+------+
|  USER DB    |
+-------------+
```

### Entity Relationship Diagram (ERD)

**Description**: The ERD shows the relationships between data entities in the system.

```
+----------------+       +----------------+       +----------------+
|     USER       |       |    PROJECT     |       |   CATEGORY     |
+----------------+       +----------------+       +----------------+
| _id (PK)       |       | _id (PK)       |       | _id (PK)       |
| name           |       | title          |       | name           |
| email          |       | description    |       | slug           |
| password       |       | client (FK)    |<------| icon           |
| userType       |       | category (FK)  |       | isActive       |
| skills[]       |       | budget         |       +----------------+
| bio            |       | status         |
| avatar         |       | createdAt      |
+-------+--------+       +-------+--------+
        |                        |
        | 1                      | 1
        |                        |
        | *                      | *
+-------+--------+       +-------+--------+
|   PROPOSAL     |       |     ORDER      |
+----------------+       +----------------+
| _id (PK)       |       | _id (PK)       |
| gigId (FK)     |       | orderId        |
| clientId (FK)  |       | gig (FK)       |
| freelancerId   |       | clientId (FK)  |
| status         |       | sellerId (FK)  |
| message        |       | amount         |
| createdAt      |       | status         |
+----------------+       +----------------+
        
+----------------+       +----------------+
|    MESSAGE     |       |  SUBSCRIBER    |
+----------------+       +----------------+
| _id (PK)       |       | _id (PK)       |
| sender (FK)    |       | email          |
| recipient (FK) |       | subscribedAt   |
| text           |       +----------------+
| read           |
| createdAt      |
+----------------+
```

**Relationships**:
- One User can create many Projects (1:M)
- One User can submit many Proposals (1:M)
- One User can have many Orders as client or seller (1:M)
- One User can send/receive many Messages (1:M)
- One Project belongs to one Category (M:1)
- One Project can have many Proposals (1:M)
- One Order is linked to one Project (M:1)

---

# 5. GITHUB LINK

**Repository URL**: [To be added by the user]

**Repository Structure**:
```
getwork/
├── frontend/          # React.js frontend application
├── backend/           # Node.js + Express.js backend
├── README.md          # Project documentation
├── QUICKSTART.md      # Quick setup guide
└── FILE_STRUCTURE.md  # Detailed file structure
```

**Branching Strategy**:
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

---

# 6. DEPLOYED LINK

**Frontend URL**: [To be added by the user]

**Backend API URL**: [To be added by the user]

**Deployment Platform**: [To be specified - e.g., Vercel, Render, Railway]

**Deployment Configuration**:
- Frontend: Static site hosting with Vite build
- Backend: Node.js container with environment variables
- Database: MongoDB Atlas cloud cluster

---

# 7. CLIENT APPROVAL PROOF

[This section should contain screenshots or scanned documents showing client approval]

**Document Type**: Client Approval Letter/Email

**Date of Approval**: [To be added]

**Client Representative**: [To be added]

**Approval Statement**: The client has reviewed the project requirements and final deliverables, confirming that the getWork Freelancer Marketplace Platform meets the specified requirements and is approved for submission.

---

# 8. CLIENT LOCATION PROOF

[This section should contain evidence of client location]

**Client Organization**: [To be added]

**Physical Address**: [To be added]

**City, State, Country**: [To be added]

**Verification Method**: [Google Maps screenshot / Official letterhead / Business registration]

---

# 9. TRANSACTION ID PROOF

[This section should contain payment/transaction evidence]

**Transaction ID**: [To be added]

**Payment Date**: [To be added]

**Amount**: [To be added]

**Payment Method**: [To be added]

**Screenshot/Receipt**: [To be attached]

---

# 10. EMAIL ACKNOWLEDGEMENT

[This section should contain email correspondence proof]

**Email From**: [Client email]

**Email To**: [Developer email]

**Date**: [To be added]

**Subject**: Project Completion Acknowledgement - getWork Platform

**Email Content Summary**: Acknowledgement of project completion, satisfaction with deliverables, and approval for academic submission.

---

# 11. GST No.

[This section should contain GST registration details if applicable]

**GST Registration Number**: [To be added if applicable]

**Business Name**: [To be added]

**Registration State**: [To be added]

**Note**: If not registered for GST, mention "Not Applicable - Below GST threshold" or "Individual Freelancer - GST not required"

---

# A. APPENDICES

## A.1 Appendix 1: Database Schema

### User Schema
```javascript
{
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  userType: { type: String, enum: ['client', 'freelancer'], required: true },
  avatar: { type: String, default: null },
  bio: { type: String, maxLength: 1000, default: '' },
  skills: { type: [String], default: [] },
  location: { type: String, default: '' },
  stats: {
    projectsCompleted: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
}
```

### Project Schema
```javascript
{
  title: { type: String, required: true, minLength: 5, maxLength: 200 },
  description: { type: String, required: true, minLength: 20, maxLength: 5000 },
  category: { type: ObjectId, ref: 'Category', required: true },
  client: { type: ObjectId, ref: 'User', required: true },
  budget: {
    type: { type: String, enum: ['fixed', 'range'] },
    fixed: { type: Number },
    min: { type: Number },
    max: { type: Number }
  },
  duration: {
    value: { type: Number },
    unit: { type: String, enum: ['days', 'weeks', 'months'] }
  },
  skills: { type: [String], default: [] },
  status: { type: String, enum: ['open', 'in_progress', 'completed', 'cancelled'], default: 'open' },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
}
// Indexes: category, status, client, createdAt
```

### Order Schema
```javascript
{
  orderId: { type: String, unique: true },
  title: { type: String, required: true },
  gig: { type: ObjectId, ref: 'Project', required: true },
  clientId: { type: ObjectId, ref: 'User', required: true },
  sellerId: { type: ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}
// Indexes: clientId, sellerId, status, createdAt
```

### Message Schema
```javascript
{
  sender: { type: ObjectId, ref: 'User', required: true },
  recipient: { type: ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, maxLength: 5000 },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
// Indexes: sender, recipient, createdAt
```

## A.2 Appendix 2: API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/auth/logout | Logout user | Yes |
| GET | /api/auth/me | Get current user | Yes |

### Project Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/projects | Get all projects | No |
| GET | /api/projects/featured | Get featured projects | No |
| GET | /api/projects/:id | Get project by ID | No |
| GET | /api/projects/my-posts | Get user's projects | Yes |
| POST | /api/projects | Create project | Yes (Client) |
| PUT | /api/projects/:id | Update project | Yes (Owner) |
| DELETE | /api/projects/:id | Delete project | Yes (Owner) |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/orders | Get user's orders | Yes |
| GET | /api/orders/:id | Get order by ID | Yes |
| POST | /api/orders | Create order | Yes |
| PUT | /api/orders/:id/status | Update order status | Yes |

### Proposal Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/proposals/received | Get received proposals | Yes |
| GET | /api/proposals/check/:gigId | Check if applied | Yes |
| POST | /api/proposals | Submit proposal | Yes |
| POST | /api/proposals/:id/accept | Accept proposal | Yes (Owner) |
| POST | /api/proposals/:id/reject | Reject proposal | Yes (Owner) |

### Message Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/messages/conversations | Get conversations | Yes |
| GET | /api/messages/history/:userId | Get chat history | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/users/stats | Get user statistics | Yes |
| GET | /api/users/orders | Get user orders | Yes |
| PUT | /api/users/profile | Update profile | Yes |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/categories | Get all categories | No |
| GET | /api/categories/featured | Get featured categories | No |
| GET | /api/categories/:slug | Get category by slug | No |

---

**End of Software Requirements Specification Document**

---

*Document prepared for academic submission*
*getWork - Freelancer Marketplace Platform*
*Version 1.2 | December 2024*
