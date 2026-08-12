# Bus Guardian System Architecture

This document provides a high-level architectural view of the Bus Guardian system. It outlines how the frontend communicates with the backend, and how the backend is structured into distinct functional layers.

## High-Level System Architecture

The system follows a standard **3-Tier Architecture**:
1. **Presentation Layer (Frontend)**: A React-based Single Page Application (SPA) providing the user interface for administrators.
2. **Application Layer (Backend)**: A Node.js and Express server handling API requests, business logic, and authentication.
3. **Data Layer (Database)**: A MongoDB database storing application state and entities.

```mermaid
graph TD
    %% Define Styles
    classDef frontend fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px,color:#fff
    classDef backend fill:#10b981,stroke:#047857,stroke-width:2px,color:#fff
    classDef database fill:#f59e0b,stroke:#b45309,stroke-width:2px,color:#fff

    subgraph Client ["Client Side (Presentation)"]
        A[React Admin Portal<br>Vite + Redux]:::frontend
    end

    subgraph Server ["Server Side (Application Layer)"]
        B[Express API Gateway<br>/api/*]:::backend
        
        subgraph Middlewares
            M1[JWT VerifyToken Middleware]
        end

        subgraph Controllers ["Controllers (Request/Response Handling)"]
            C1[Admin Controller]
            C2[Bus Controller]
            C3[Driver Controller]
            C4[Student Controller]
            C5[Route Controller]
        end
        
        subgraph Services ["Services (Business Logic)"]
            S1[Admin Services]
            S2[Bus Services]
            S3[Driver Services]
            S4[Student Services]
            S5[Route Services]
        end
        
        subgraph Models ["Mongoose Models (Data Schema)"]
            Mdl1[Admin Model]
            Mdl2[Bus Model]
            Mdl3[Driver Model]
            Mdl4[Student Model]
            Mdl5[BusRoute Model]
        end
    end

    subgraph DB ["Data Layer"]
        DB1[(MongoDB Atlas)]:::database
    end

    %% Flow connections
    A -- "REST API (HTTP/JSON)" --> B
    B --> M1
    
    M1 -- "Authenticated Route" --> C2
    M1 -- "Authenticated Route" --> C3
    M1 -- "Authenticated Route" --> C4
    M1 -- "Authenticated Route" --> C5
    B -- "Public Route (Login/Register)" --> C1
    
    C1 --> S1
    C2 --> S2
    C3 --> S3
    C4 --> S4
    C5 --> S5
    
    S1 --> Mdl1
    S2 --> Mdl2
    S3 --> Mdl3
    S4 --> Mdl4
    S5 --> Mdl5
    
    Mdl1 --> DB1
    Mdl2 --> DB1
    Mdl3 --> DB1
    Mdl4 --> DB1
    Mdl5 --> DB1

```

## Data Entity Relationships

The entities in the database are highly relational. Understanding these relationships is crucial to understanding the business logic.

```mermaid
erDiagram
    BUS ||--o| DRIVER : "assigned to"
    BUS ||--o| BUSROUTE : "follows"
    BUS ||--o| STUDENT : "transports"
    
    BUS {
        ObjectId _id
        String busNumber
        Number busCapacity
        ObjectId assignedDriver
        ObjectId assignedRoute
    }
    
    DRIVER {
        ObjectId _id
        String driverName
        String driverPhoneNo
        ObjectId assignedBus
    }
    
    STUDENT {
        ObjectId _id
        String studentId
        String studentName
        Number parentPhoneNo
        String checkpoint
        ObjectId assignedBus
    }
    
    BUSROUTE {
        ObjectId _id
        String routeName
        Array locationsList
        ObjectId assignedBus
    }
    
    ADMIN {
        ObjectId _id
        String email
        Number phoneNo
        String password
    }
```

## Backend Layer Responsibilities

1. **Routes (`/routes`)**: Maps specific HTTP verbs (GET, POST, PUT, DELETE) and URL paths to their respective Controller functions. It also attaches the `VerifyToken` middleware to protected endpoints.
2. **Controllers (`/controllers`)**: The entry point for business logic. They extract data from incoming HTTP requests (`req.body`, `req.params`), pass it to the Services, and format the HTTP response (status codes and JSON payload) to send back to the client.
3. **Services (`/services`)**: Contains the core business logic. This layer performs validations, data formatting, and cross-model interactions (e.g., when a Driver is assigned to a Bus, the Service updates *both* the Driver and Bus collections). This abstracts logic away from the controller, ensuring it can be reused easily.
4. **Models (`/models`)**: Defines the Mongoose schemas. They dictate the exact structure of a document in MongoDB, providing built-in type validation and relationship references.
5. **Utilities (`/utility`)**: Helper functions used globally across the backend, such as JWT token generation/verification, bcrypt password hashing, and fetching geolocation coordinates.
