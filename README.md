<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  <img src="project/images/meilisearch.svg" width="200" alt="Nest Logo" />
  <img src="project/images/jwt-token.png" width="348" alt="Nest Logo" />
  
</p>

# Build an API for an expense tracker application.

> Roadmap.sh project link > https://roadmap.sh/projects/expense-tracker-api 

Build an API for an expense tracker application. **This API should allow users to create, read, update, and delete expenses.** **Users should be able to sign up and log in to the application. Each user should have their own set of expenses.**

<p align="center">
 <img src="project/images/expense-tracker-api-m72p5.png" width="1932" alt="Nest Logo" />
</p>

> Features
> Here are the features that you should implement in your Expense Tracker API:

- Sign up as a new user.
- Generate and validate JWTs for handling authentication and user session.
- List and filter your past expenses. You can add the following filters:
  - Past week
  - Past month
  - Last 3 months
  - Custom (to specify a start and end date of your choosing).
- Add a new expense
- Remove existing expenses
- Update existing expenses

> Constraints
> You can use any programming language and framework of your choice. You can use a database of your choice to store the data. You can use any ORM or database library to interact with the database.

Here are some constraints that you should follow:

- You’ll be using JWT (JSON Web Token) to protect the endpoints and to identify the requester.
- For the different expense categories, you can use the following list (feel free to decide how to implement this as part of your data model):
  - Groceries
  - Leisure
  - Electronics
  - Utilities
  - Clothing
  - Health
  - Others

---

### SOLUTION

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)

<p align="center">

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=coverage)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=TheGreatJordach_nestjs-expense-tracker&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=TheGreatJordach_nestjs-expense-tracker)

</p>

#### Data Model

For an expense tracker, the data model for the Expense entity should capture all the necessary details for an expense entry, such as the user who made the expense, the amount, category, date, and any additional notes. It should also support filtering and allow for updating and deleting records.

**1. User Entity Data Model**

```typescript
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName?: string;
  @Column({ unique: true })
  email: Email;
  @Column()
  password: string;
  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
```
**2. Expense Entity Data Model**
```typescript
@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" }) // Use bigint for amount stored in minor units (e.g., cents)
  amount: number;
  @Column({ type: "varchar", length: 3 }) // Store currency as a 3-letter code (ISO 4217)
  currency: string;
  @Column({
    type: "enum",
    enum: ExpenseCategoryEnum,
    default: ExpenseCategoryEnum.OTHERS,
  })
  category: ExpenseCategoryEnum;
  @Column()
  description: string;
  @Column({ type: Date })
  date: Date;
  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
```

**3. ExpenseCategoryEnum Enum**

To represent the fixed list of categories:

```typescript
enum ExpenseCategoryEnum {
  GROCERIES = "Groceries",
  LEISURE = "Leisure",
  ELECTRONICS = "Electronics",
  UTILITIES = "Utilities",
  CLOTHING = "Clothing",
  HEALTH = "Health",
  OTHERS = "Others",
}
```

Types definition

**Email Type Definition**

```typescript
//src/common/types/email.type.ts
export type Email = string & { readonly brand: unique symbol };

// src/common/util/email.util.ts
export function validateEmail(email: string): Email {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
  if (!emailPattern.test(email)) {
    throw new BadRequestException(`Invalid email format ${email}`);
  }
  return email as Email; // Cast to an Email type
}
```

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
 src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[RoadMap.sh](https://roadmap.sh/projects/expense-tracker-api) Project description.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jordach Makaya](https://kamilmysliwiec.com)
- Linkedin - [jordachmakaya](https://www.linkedin.com/in/jordachmakaya/)
- WakaTime - [@jordach](https://wakatime.com/@jordach)

## License

Nest is [MIT licensed](LICENSE).
