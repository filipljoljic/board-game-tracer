
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model GroupMember
 * 
 */
export type GroupMember = $Result.DefaultSelection<Prisma.$GroupMemberPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model CustomScoreTemplate
 * 
 */
export type CustomScoreTemplate = $Result.DefaultSelection<Prisma.$CustomScoreTemplatePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model SessionPlayer
 * 
 */
export type SessionPlayer = $Result.DefaultSelection<Prisma.$SessionPlayerPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs>;

  /**
   * `prisma.groupMember`: Exposes CRUD operations for the **GroupMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMembers
    * const groupMembers = await prisma.groupMember.findMany()
    * ```
    */
  get groupMember(): Prisma.GroupMemberDelegate<ExtArgs>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs>;

  /**
   * `prisma.customScoreTemplate`: Exposes CRUD operations for the **CustomScoreTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomScoreTemplates
    * const customScoreTemplates = await prisma.customScoreTemplate.findMany()
    * ```
    */
  get customScoreTemplate(): Prisma.CustomScoreTemplateDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.sessionPlayer`: Exposes CRUD operations for the **SessionPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionPlayers
    * const sessionPlayers = await prisma.sessionPlayer.findMany()
    * ```
    */
  get sessionPlayer(): Prisma.SessionPlayerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Group: 'Group',
    GroupMember: 'GroupMember',
    Game: 'Game',
    CustomScoreTemplate: 'CustomScoreTemplate',
    Session: 'Session',
    SessionPlayer: 'SessionPlayer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "group" | "groupMember" | "game" | "customScoreTemplate" | "session" | "sessionPlayer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      GroupMember: {
        payload: Prisma.$GroupMemberPayload<ExtArgs>
        fields: Prisma.GroupMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          findFirst: {
            args: Prisma.GroupMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          findMany: {
            args: Prisma.GroupMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>[]
          }
          create: {
            args: Prisma.GroupMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          createMany: {
            args: Prisma.GroupMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>[]
          }
          delete: {
            args: Prisma.GroupMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          update: {
            args: Prisma.GroupMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          deleteMany: {
            args: Prisma.GroupMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMemberPayload>
          }
          aggregate: {
            args: Prisma.GroupMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMember>
          }
          groupBy: {
            args: Prisma.GroupMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMemberCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMemberCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      CustomScoreTemplate: {
        payload: Prisma.$CustomScoreTemplatePayload<ExtArgs>
        fields: Prisma.CustomScoreTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomScoreTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomScoreTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          findFirst: {
            args: Prisma.CustomScoreTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomScoreTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          findMany: {
            args: Prisma.CustomScoreTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>[]
          }
          create: {
            args: Prisma.CustomScoreTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          createMany: {
            args: Prisma.CustomScoreTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomScoreTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>[]
          }
          delete: {
            args: Prisma.CustomScoreTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          update: {
            args: Prisma.CustomScoreTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          deleteMany: {
            args: Prisma.CustomScoreTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomScoreTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomScoreTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomScoreTemplatePayload>
          }
          aggregate: {
            args: Prisma.CustomScoreTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomScoreTemplate>
          }
          groupBy: {
            args: Prisma.CustomScoreTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomScoreTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomScoreTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<CustomScoreTemplateCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      SessionPlayer: {
        payload: Prisma.$SessionPlayerPayload<ExtArgs>
        fields: Prisma.SessionPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          findFirst: {
            args: Prisma.SessionPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          findMany: {
            args: Prisma.SessionPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>[]
          }
          create: {
            args: Prisma.SessionPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          createMany: {
            args: Prisma.SessionPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionPlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>[]
          }
          delete: {
            args: Prisma.SessionPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          update: {
            args: Prisma.SessionPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          deleteMany: {
            args: Prisma.SessionPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPlayerPayload>
          }
          aggregate: {
            args: Prisma.SessionPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionPlayer>
          }
          groupBy: {
            args: Prisma.SessionPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<SessionPlayerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    groups: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    groups?: boolean | UserCountOutputTypeCountGroupsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionPlayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    members: number
    sessions: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | GroupCountOutputTypeCountMembersArgs
    sessions?: boolean | GroupCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    templates: number
    sessions: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | GameCountOutputTypeCountTemplatesArgs
    sessions?: boolean | GameCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomScoreTemplateWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type CustomScoreTemplateCountOutputType
   */

  export type CustomScoreTemplateCountOutputType = {
    sessions: number
  }

  export type CustomScoreTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | CustomScoreTemplateCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * CustomScoreTemplateCountOutputType without action
   */
  export type CustomScoreTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplateCountOutputType
     */
    select?: CustomScoreTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomScoreTemplateCountOutputType without action
   */
  export type CustomScoreTemplateCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    players: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | SessionCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionPlayerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    isGuest: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    isGuest: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    isGuest: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    isGuest?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    isGuest?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    isGuest?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string | null
    isGuest: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    isGuest?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    isGuest?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    isGuest?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPlayerPayload<ExtArgs>[]
      groups: Prisma.$GroupMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string | null
      isGuest: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findMany"> | Null>
    groups<T extends User$groupsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly isGuest: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    where?: SessionPlayerWhereInput
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    cursor?: SessionPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionPlayerScalarFieldEnum | SessionPlayerScalarFieldEnum[]
  }

  /**
   * User.groups
   */
  export type User$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    cursor?: GroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    members?: boolean | Group$membersArgs<ExtArgs>
    sessions?: boolean | Group$sessionsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Group$membersArgs<ExtArgs>
    sessions?: boolean | Group$sessionsArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      members: Prisma.$GroupMemberPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Group$membersArgs<ExtArgs> = {}>(args?: Subset<T, Group$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends Group$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Group$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */ 
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
  }

  /**
   * Group.members
   */
  export type Group$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    cursor?: GroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * Group.sessions
   */
  export type Group$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model GroupMember
   */

  export type AggregateGroupMember = {
    _count: GroupMemberCountAggregateOutputType | null
    _min: GroupMemberMinAggregateOutputType | null
    _max: GroupMemberMaxAggregateOutputType | null
  }

  export type GroupMemberMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
    role: string | null
  }

  export type GroupMemberMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
    role: string | null
  }

  export type GroupMemberCountAggregateOutputType = {
    id: number
    groupId: number
    userId: number
    role: number
    _all: number
  }


  export type GroupMemberMinAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    role?: true
  }

  export type GroupMemberMaxAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    role?: true
  }

  export type GroupMemberCountAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    role?: true
    _all?: true
  }

  export type GroupMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMember to aggregate.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMembers
    **/
    _count?: true | GroupMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMemberMaxAggregateInputType
  }

  export type GetGroupMemberAggregateType<T extends GroupMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMember[P]>
      : GetScalarType<T[P], AggregateGroupMember[P]>
  }




  export type GroupMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMemberWhereInput
    orderBy?: GroupMemberOrderByWithAggregationInput | GroupMemberOrderByWithAggregationInput[]
    by: GroupMemberScalarFieldEnum[] | GroupMemberScalarFieldEnum
    having?: GroupMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMemberCountAggregateInputType | true
    _min?: GroupMemberMinAggregateInputType
    _max?: GroupMemberMaxAggregateInputType
  }

  export type GroupMemberGroupByOutputType = {
    id: string
    groupId: string
    userId: string
    role: string
    _count: GroupMemberCountAggregateOutputType | null
    _min: GroupMemberMinAggregateOutputType | null
    _max: GroupMemberMaxAggregateOutputType | null
  }

  type GetGroupMemberGroupByPayload<T extends GroupMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMemberGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMemberGroupByOutputType[P]>
        }
      >
    >


  export type GroupMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    userId?: boolean
    role?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMember"]>

  export type GroupMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    userId?: boolean
    role?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMember"]>

  export type GroupMemberSelectScalar = {
    id?: boolean
    groupId?: boolean
    userId?: boolean
    role?: boolean
  }

  export type GroupMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMember"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      userId: string
      role: string
    }, ExtArgs["result"]["groupMember"]>
    composites: {}
  }

  type GroupMemberGetPayload<S extends boolean | null | undefined | GroupMemberDefaultArgs> = $Result.GetResult<Prisma.$GroupMemberPayload, S>

  type GroupMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GroupMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GroupMemberCountAggregateInputType | true
    }

  export interface GroupMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMember'], meta: { name: 'GroupMember' } }
    /**
     * Find zero or one GroupMember that matches the filter.
     * @param {GroupMemberFindUniqueArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMemberFindUniqueArgs>(args: SelectSubset<T, GroupMemberFindUniqueArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GroupMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GroupMemberFindUniqueOrThrowArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GroupMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindFirstArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMemberFindFirstArgs>(args?: SelectSubset<T, GroupMemberFindFirstArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GroupMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindFirstOrThrowArgs} args - Arguments to find a GroupMember
     * @example
     * // Get one GroupMember
     * const groupMember = await prisma.groupMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GroupMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMembers
     * const groupMembers = await prisma.groupMember.findMany()
     * 
     * // Get first 10 GroupMembers
     * const groupMembers = await prisma.groupMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupMemberWithIdOnly = await prisma.groupMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupMemberFindManyArgs>(args?: SelectSubset<T, GroupMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GroupMember.
     * @param {GroupMemberCreateArgs} args - Arguments to create a GroupMember.
     * @example
     * // Create one GroupMember
     * const GroupMember = await prisma.groupMember.create({
     *   data: {
     *     // ... data to create a GroupMember
     *   }
     * })
     * 
     */
    create<T extends GroupMemberCreateArgs>(args: SelectSubset<T, GroupMemberCreateArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GroupMembers.
     * @param {GroupMemberCreateManyArgs} args - Arguments to create many GroupMembers.
     * @example
     * // Create many GroupMembers
     * const groupMember = await prisma.groupMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMemberCreateManyArgs>(args?: SelectSubset<T, GroupMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupMembers and returns the data saved in the database.
     * @param {GroupMemberCreateManyAndReturnArgs} args - Arguments to create many GroupMembers.
     * @example
     * // Create many GroupMembers
     * const groupMember = await prisma.groupMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupMembers and only return the `id`
     * const groupMemberWithIdOnly = await prisma.groupMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GroupMember.
     * @param {GroupMemberDeleteArgs} args - Arguments to delete one GroupMember.
     * @example
     * // Delete one GroupMember
     * const GroupMember = await prisma.groupMember.delete({
     *   where: {
     *     // ... filter to delete one GroupMember
     *   }
     * })
     * 
     */
    delete<T extends GroupMemberDeleteArgs>(args: SelectSubset<T, GroupMemberDeleteArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GroupMember.
     * @param {GroupMemberUpdateArgs} args - Arguments to update one GroupMember.
     * @example
     * // Update one GroupMember
     * const groupMember = await prisma.groupMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMemberUpdateArgs>(args: SelectSubset<T, GroupMemberUpdateArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GroupMembers.
     * @param {GroupMemberDeleteManyArgs} args - Arguments to filter GroupMembers to delete.
     * @example
     * // Delete a few GroupMembers
     * const { count } = await prisma.groupMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMemberDeleteManyArgs>(args?: SelectSubset<T, GroupMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMembers
     * const groupMember = await prisma.groupMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMemberUpdateManyArgs>(args: SelectSubset<T, GroupMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GroupMember.
     * @param {GroupMemberUpsertArgs} args - Arguments to update or create a GroupMember.
     * @example
     * // Update or create a GroupMember
     * const groupMember = await prisma.groupMember.upsert({
     *   create: {
     *     // ... data to create a GroupMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMember we want to update
     *   }
     * })
     */
    upsert<T extends GroupMemberUpsertArgs>(args: SelectSubset<T, GroupMemberUpsertArgs<ExtArgs>>): Prisma__GroupMemberClient<$Result.GetResult<Prisma.$GroupMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberCountArgs} args - Arguments to filter GroupMembers to count.
     * @example
     * // Count the number of GroupMembers
     * const count = await prisma.groupMember.count({
     *   where: {
     *     // ... the filter for the GroupMembers we want to count
     *   }
     * })
    **/
    count<T extends GroupMemberCountArgs>(
      args?: Subset<T, GroupMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupMemberAggregateArgs>(args: Subset<T, GroupMemberAggregateArgs>): Prisma.PrismaPromise<GetGroupMemberAggregateType<T>>

    /**
     * Group by GroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMemberGroupByArgs['orderBy'] }
        : { orderBy?: GroupMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMember model
   */
  readonly fields: GroupMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupMember model
   */ 
  interface GroupMemberFieldRefs {
    readonly id: FieldRef<"GroupMember", 'String'>
    readonly groupId: FieldRef<"GroupMember", 'String'>
    readonly userId: FieldRef<"GroupMember", 'String'>
    readonly role: FieldRef<"GroupMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GroupMember findUnique
   */
  export type GroupMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember findUniqueOrThrow
   */
  export type GroupMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember findFirst
   */
  export type GroupMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMembers.
     */
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember findFirstOrThrow
   */
  export type GroupMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMember to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMembers.
     */
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember findMany
   */
  export type GroupMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembers to fetch.
     */
    where?: GroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMembers to fetch.
     */
    orderBy?: GroupMemberOrderByWithRelationInput | GroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMembers.
     */
    cursor?: GroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMembers.
     */
    skip?: number
    distinct?: GroupMemberScalarFieldEnum | GroupMemberScalarFieldEnum[]
  }

  /**
   * GroupMember create
   */
  export type GroupMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMember.
     */
    data: XOR<GroupMemberCreateInput, GroupMemberUncheckedCreateInput>
  }

  /**
   * GroupMember createMany
   */
  export type GroupMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMembers.
     */
    data: GroupMemberCreateManyInput | GroupMemberCreateManyInput[]
  }

  /**
   * GroupMember createManyAndReturn
   */
  export type GroupMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GroupMembers.
     */
    data: GroupMemberCreateManyInput | GroupMemberCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMember update
   */
  export type GroupMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMember.
     */
    data: XOR<GroupMemberUpdateInput, GroupMemberUncheckedUpdateInput>
    /**
     * Choose, which GroupMember to update.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember updateMany
   */
  export type GroupMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMembers.
     */
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which GroupMembers to update
     */
    where?: GroupMemberWhereInput
  }

  /**
   * GroupMember upsert
   */
  export type GroupMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMember to update in case it exists.
     */
    where: GroupMemberWhereUniqueInput
    /**
     * In case the GroupMember found by the `where` argument doesn't exist, create a new GroupMember with this data.
     */
    create: XOR<GroupMemberCreateInput, GroupMemberUncheckedCreateInput>
    /**
     * In case the GroupMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMemberUpdateInput, GroupMemberUncheckedUpdateInput>
  }

  /**
   * GroupMember delete
   */
  export type GroupMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
    /**
     * Filter which GroupMember to delete.
     */
    where: GroupMemberWhereUniqueInput
  }

  /**
   * GroupMember deleteMany
   */
  export type GroupMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMembers to delete
     */
    where?: GroupMemberWhereInput
  }

  /**
   * GroupMember without action
   */
  export type GroupMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMember
     */
    select?: GroupMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMemberInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type GameMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    name: string
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templates?: boolean | Game$templatesArgs<ExtArgs>
    sessions?: boolean | Game$sessionsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | Game$templatesArgs<ExtArgs>
    sessions?: boolean | Game$sessionsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      templates: Prisma.$CustomScoreTemplatePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    templates<T extends Game$templatesArgs<ExtArgs> = {}>(args?: Subset<T, Game$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends Game$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Game$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */ 
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly name: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
  }

  /**
   * Game.templates
   */
  export type Game$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    where?: CustomScoreTemplateWhereInput
    orderBy?: CustomScoreTemplateOrderByWithRelationInput | CustomScoreTemplateOrderByWithRelationInput[]
    cursor?: CustomScoreTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomScoreTemplateScalarFieldEnum | CustomScoreTemplateScalarFieldEnum[]
  }

  /**
   * Game.sessions
   */
  export type Game$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model CustomScoreTemplate
   */

  export type AggregateCustomScoreTemplate = {
    _count: CustomScoreTemplateCountAggregateOutputType | null
    _min: CustomScoreTemplateMinAggregateOutputType | null
    _max: CustomScoreTemplateMaxAggregateOutputType | null
  }

  export type CustomScoreTemplateMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    name: string | null
    fields: string | null
  }

  export type CustomScoreTemplateMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    name: string | null
    fields: string | null
  }

  export type CustomScoreTemplateCountAggregateOutputType = {
    id: number
    gameId: number
    name: number
    fields: number
    _all: number
  }


  export type CustomScoreTemplateMinAggregateInputType = {
    id?: true
    gameId?: true
    name?: true
    fields?: true
  }

  export type CustomScoreTemplateMaxAggregateInputType = {
    id?: true
    gameId?: true
    name?: true
    fields?: true
  }

  export type CustomScoreTemplateCountAggregateInputType = {
    id?: true
    gameId?: true
    name?: true
    fields?: true
    _all?: true
  }

  export type CustomScoreTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomScoreTemplate to aggregate.
     */
    where?: CustomScoreTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomScoreTemplates to fetch.
     */
    orderBy?: CustomScoreTemplateOrderByWithRelationInput | CustomScoreTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomScoreTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomScoreTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomScoreTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomScoreTemplates
    **/
    _count?: true | CustomScoreTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomScoreTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomScoreTemplateMaxAggregateInputType
  }

  export type GetCustomScoreTemplateAggregateType<T extends CustomScoreTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomScoreTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomScoreTemplate[P]>
      : GetScalarType<T[P], AggregateCustomScoreTemplate[P]>
  }




  export type CustomScoreTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomScoreTemplateWhereInput
    orderBy?: CustomScoreTemplateOrderByWithAggregationInput | CustomScoreTemplateOrderByWithAggregationInput[]
    by: CustomScoreTemplateScalarFieldEnum[] | CustomScoreTemplateScalarFieldEnum
    having?: CustomScoreTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomScoreTemplateCountAggregateInputType | true
    _min?: CustomScoreTemplateMinAggregateInputType
    _max?: CustomScoreTemplateMaxAggregateInputType
  }

  export type CustomScoreTemplateGroupByOutputType = {
    id: string
    gameId: string
    name: string
    fields: string
    _count: CustomScoreTemplateCountAggregateOutputType | null
    _min: CustomScoreTemplateMinAggregateOutputType | null
    _max: CustomScoreTemplateMaxAggregateOutputType | null
  }

  type GetCustomScoreTemplateGroupByPayload<T extends CustomScoreTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomScoreTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomScoreTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomScoreTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], CustomScoreTemplateGroupByOutputType[P]>
        }
      >
    >


  export type CustomScoreTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    name?: boolean
    fields?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    sessions?: boolean | CustomScoreTemplate$sessionsArgs<ExtArgs>
    _count?: boolean | CustomScoreTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customScoreTemplate"]>

  export type CustomScoreTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    name?: boolean
    fields?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customScoreTemplate"]>

  export type CustomScoreTemplateSelectScalar = {
    id?: boolean
    gameId?: boolean
    name?: boolean
    fields?: boolean
  }

  export type CustomScoreTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    sessions?: boolean | CustomScoreTemplate$sessionsArgs<ExtArgs>
    _count?: boolean | CustomScoreTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomScoreTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $CustomScoreTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomScoreTemplate"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      name: string
      fields: string
    }, ExtArgs["result"]["customScoreTemplate"]>
    composites: {}
  }

  type CustomScoreTemplateGetPayload<S extends boolean | null | undefined | CustomScoreTemplateDefaultArgs> = $Result.GetResult<Prisma.$CustomScoreTemplatePayload, S>

  type CustomScoreTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomScoreTemplateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomScoreTemplateCountAggregateInputType | true
    }

  export interface CustomScoreTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomScoreTemplate'], meta: { name: 'CustomScoreTemplate' } }
    /**
     * Find zero or one CustomScoreTemplate that matches the filter.
     * @param {CustomScoreTemplateFindUniqueArgs} args - Arguments to find a CustomScoreTemplate
     * @example
     * // Get one CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomScoreTemplateFindUniqueArgs>(args: SelectSubset<T, CustomScoreTemplateFindUniqueArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustomScoreTemplate that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomScoreTemplateFindUniqueOrThrowArgs} args - Arguments to find a CustomScoreTemplate
     * @example
     * // Get one CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomScoreTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomScoreTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustomScoreTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateFindFirstArgs} args - Arguments to find a CustomScoreTemplate
     * @example
     * // Get one CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomScoreTemplateFindFirstArgs>(args?: SelectSubset<T, CustomScoreTemplateFindFirstArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustomScoreTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateFindFirstOrThrowArgs} args - Arguments to find a CustomScoreTemplate
     * @example
     * // Get one CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomScoreTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomScoreTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustomScoreTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomScoreTemplates
     * const customScoreTemplates = await prisma.customScoreTemplate.findMany()
     * 
     * // Get first 10 CustomScoreTemplates
     * const customScoreTemplates = await prisma.customScoreTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customScoreTemplateWithIdOnly = await prisma.customScoreTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomScoreTemplateFindManyArgs>(args?: SelectSubset<T, CustomScoreTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustomScoreTemplate.
     * @param {CustomScoreTemplateCreateArgs} args - Arguments to create a CustomScoreTemplate.
     * @example
     * // Create one CustomScoreTemplate
     * const CustomScoreTemplate = await prisma.customScoreTemplate.create({
     *   data: {
     *     // ... data to create a CustomScoreTemplate
     *   }
     * })
     * 
     */
    create<T extends CustomScoreTemplateCreateArgs>(args: SelectSubset<T, CustomScoreTemplateCreateArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustomScoreTemplates.
     * @param {CustomScoreTemplateCreateManyArgs} args - Arguments to create many CustomScoreTemplates.
     * @example
     * // Create many CustomScoreTemplates
     * const customScoreTemplate = await prisma.customScoreTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomScoreTemplateCreateManyArgs>(args?: SelectSubset<T, CustomScoreTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomScoreTemplates and returns the data saved in the database.
     * @param {CustomScoreTemplateCreateManyAndReturnArgs} args - Arguments to create many CustomScoreTemplates.
     * @example
     * // Create many CustomScoreTemplates
     * const customScoreTemplate = await prisma.customScoreTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomScoreTemplates and only return the `id`
     * const customScoreTemplateWithIdOnly = await prisma.customScoreTemplate.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomScoreTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomScoreTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustomScoreTemplate.
     * @param {CustomScoreTemplateDeleteArgs} args - Arguments to delete one CustomScoreTemplate.
     * @example
     * // Delete one CustomScoreTemplate
     * const CustomScoreTemplate = await prisma.customScoreTemplate.delete({
     *   where: {
     *     // ... filter to delete one CustomScoreTemplate
     *   }
     * })
     * 
     */
    delete<T extends CustomScoreTemplateDeleteArgs>(args: SelectSubset<T, CustomScoreTemplateDeleteArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustomScoreTemplate.
     * @param {CustomScoreTemplateUpdateArgs} args - Arguments to update one CustomScoreTemplate.
     * @example
     * // Update one CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomScoreTemplateUpdateArgs>(args: SelectSubset<T, CustomScoreTemplateUpdateArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustomScoreTemplates.
     * @param {CustomScoreTemplateDeleteManyArgs} args - Arguments to filter CustomScoreTemplates to delete.
     * @example
     * // Delete a few CustomScoreTemplates
     * const { count } = await prisma.customScoreTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomScoreTemplateDeleteManyArgs>(args?: SelectSubset<T, CustomScoreTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomScoreTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomScoreTemplates
     * const customScoreTemplate = await prisma.customScoreTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomScoreTemplateUpdateManyArgs>(args: SelectSubset<T, CustomScoreTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustomScoreTemplate.
     * @param {CustomScoreTemplateUpsertArgs} args - Arguments to update or create a CustomScoreTemplate.
     * @example
     * // Update or create a CustomScoreTemplate
     * const customScoreTemplate = await prisma.customScoreTemplate.upsert({
     *   create: {
     *     // ... data to create a CustomScoreTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomScoreTemplate we want to update
     *   }
     * })
     */
    upsert<T extends CustomScoreTemplateUpsertArgs>(args: SelectSubset<T, CustomScoreTemplateUpsertArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustomScoreTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateCountArgs} args - Arguments to filter CustomScoreTemplates to count.
     * @example
     * // Count the number of CustomScoreTemplates
     * const count = await prisma.customScoreTemplate.count({
     *   where: {
     *     // ... the filter for the CustomScoreTemplates we want to count
     *   }
     * })
    **/
    count<T extends CustomScoreTemplateCountArgs>(
      args?: Subset<T, CustomScoreTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomScoreTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomScoreTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomScoreTemplateAggregateArgs>(args: Subset<T, CustomScoreTemplateAggregateArgs>): Prisma.PrismaPromise<GetCustomScoreTemplateAggregateType<T>>

    /**
     * Group by CustomScoreTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomScoreTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomScoreTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomScoreTemplateGroupByArgs['orderBy'] }
        : { orderBy?: CustomScoreTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomScoreTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomScoreTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomScoreTemplate model
   */
  readonly fields: CustomScoreTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomScoreTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomScoreTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sessions<T extends CustomScoreTemplate$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, CustomScoreTemplate$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomScoreTemplate model
   */ 
  interface CustomScoreTemplateFieldRefs {
    readonly id: FieldRef<"CustomScoreTemplate", 'String'>
    readonly gameId: FieldRef<"CustomScoreTemplate", 'String'>
    readonly name: FieldRef<"CustomScoreTemplate", 'String'>
    readonly fields: FieldRef<"CustomScoreTemplate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CustomScoreTemplate findUnique
   */
  export type CustomScoreTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter, which CustomScoreTemplate to fetch.
     */
    where: CustomScoreTemplateWhereUniqueInput
  }

  /**
   * CustomScoreTemplate findUniqueOrThrow
   */
  export type CustomScoreTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter, which CustomScoreTemplate to fetch.
     */
    where: CustomScoreTemplateWhereUniqueInput
  }

  /**
   * CustomScoreTemplate findFirst
   */
  export type CustomScoreTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter, which CustomScoreTemplate to fetch.
     */
    where?: CustomScoreTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomScoreTemplates to fetch.
     */
    orderBy?: CustomScoreTemplateOrderByWithRelationInput | CustomScoreTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomScoreTemplates.
     */
    cursor?: CustomScoreTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomScoreTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomScoreTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomScoreTemplates.
     */
    distinct?: CustomScoreTemplateScalarFieldEnum | CustomScoreTemplateScalarFieldEnum[]
  }

  /**
   * CustomScoreTemplate findFirstOrThrow
   */
  export type CustomScoreTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter, which CustomScoreTemplate to fetch.
     */
    where?: CustomScoreTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomScoreTemplates to fetch.
     */
    orderBy?: CustomScoreTemplateOrderByWithRelationInput | CustomScoreTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomScoreTemplates.
     */
    cursor?: CustomScoreTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomScoreTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomScoreTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomScoreTemplates.
     */
    distinct?: CustomScoreTemplateScalarFieldEnum | CustomScoreTemplateScalarFieldEnum[]
  }

  /**
   * CustomScoreTemplate findMany
   */
  export type CustomScoreTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter, which CustomScoreTemplates to fetch.
     */
    where?: CustomScoreTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomScoreTemplates to fetch.
     */
    orderBy?: CustomScoreTemplateOrderByWithRelationInput | CustomScoreTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomScoreTemplates.
     */
    cursor?: CustomScoreTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomScoreTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomScoreTemplates.
     */
    skip?: number
    distinct?: CustomScoreTemplateScalarFieldEnum | CustomScoreTemplateScalarFieldEnum[]
  }

  /**
   * CustomScoreTemplate create
   */
  export type CustomScoreTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a CustomScoreTemplate.
     */
    data: XOR<CustomScoreTemplateCreateInput, CustomScoreTemplateUncheckedCreateInput>
  }

  /**
   * CustomScoreTemplate createMany
   */
  export type CustomScoreTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomScoreTemplates.
     */
    data: CustomScoreTemplateCreateManyInput | CustomScoreTemplateCreateManyInput[]
  }

  /**
   * CustomScoreTemplate createManyAndReturn
   */
  export type CustomScoreTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustomScoreTemplates.
     */
    data: CustomScoreTemplateCreateManyInput | CustomScoreTemplateCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustomScoreTemplate update
   */
  export type CustomScoreTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a CustomScoreTemplate.
     */
    data: XOR<CustomScoreTemplateUpdateInput, CustomScoreTemplateUncheckedUpdateInput>
    /**
     * Choose, which CustomScoreTemplate to update.
     */
    where: CustomScoreTemplateWhereUniqueInput
  }

  /**
   * CustomScoreTemplate updateMany
   */
  export type CustomScoreTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomScoreTemplates.
     */
    data: XOR<CustomScoreTemplateUpdateManyMutationInput, CustomScoreTemplateUncheckedUpdateManyInput>
    /**
     * Filter which CustomScoreTemplates to update
     */
    where?: CustomScoreTemplateWhereInput
  }

  /**
   * CustomScoreTemplate upsert
   */
  export type CustomScoreTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the CustomScoreTemplate to update in case it exists.
     */
    where: CustomScoreTemplateWhereUniqueInput
    /**
     * In case the CustomScoreTemplate found by the `where` argument doesn't exist, create a new CustomScoreTemplate with this data.
     */
    create: XOR<CustomScoreTemplateCreateInput, CustomScoreTemplateUncheckedCreateInput>
    /**
     * In case the CustomScoreTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomScoreTemplateUpdateInput, CustomScoreTemplateUncheckedUpdateInput>
  }

  /**
   * CustomScoreTemplate delete
   */
  export type CustomScoreTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    /**
     * Filter which CustomScoreTemplate to delete.
     */
    where: CustomScoreTemplateWhereUniqueInput
  }

  /**
   * CustomScoreTemplate deleteMany
   */
  export type CustomScoreTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomScoreTemplates to delete
     */
    where?: CustomScoreTemplateWhereInput
  }

  /**
   * CustomScoreTemplate.sessions
   */
  export type CustomScoreTemplate$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * CustomScoreTemplate without action
   */
  export type CustomScoreTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    templateId: string | null
    groupId: string | null
    playedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    templateId: string | null
    groupId: string | null
    playedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    gameId: number
    templateId: number
    groupId: number
    playedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    gameId?: true
    templateId?: true
    groupId?: true
    playedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    gameId?: true
    templateId?: true
    groupId?: true
    playedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    gameId?: true
    templateId?: true
    groupId?: true
    playedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    gameId: string
    templateId: string | null
    groupId: string
    playedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    templateId?: boolean
    groupId?: boolean
    playedAt?: boolean
    players?: boolean | Session$playersArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    templateId?: boolean
    groupId?: boolean
    playedAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    gameId?: boolean
    templateId?: boolean
    groupId?: boolean
    playedAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Session$playersArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    group?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      players: Prisma.$SessionPlayerPayload<ExtArgs>[]
      game: Prisma.$GamePayload<ExtArgs>
      template: Prisma.$CustomScoreTemplatePayload<ExtArgs> | null
      group: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      templateId: string | null
      groupId: string
      playedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends Session$playersArgs<ExtArgs> = {}>(args?: Subset<T, Session$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findMany"> | Null>
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    template<T extends Session$templateArgs<ExtArgs> = {}>(args?: Subset<T, Session$templateArgs<ExtArgs>>): Prisma__CustomScoreTemplateClient<$Result.GetResult<Prisma.$CustomScoreTemplatePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly gameId: FieldRef<"Session", 'String'>
    readonly templateId: FieldRef<"Session", 'String'>
    readonly groupId: FieldRef<"Session", 'String'>
    readonly playedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session.players
   */
  export type Session$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    where?: SessionPlayerWhereInput
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    cursor?: SessionPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionPlayerScalarFieldEnum | SessionPlayerScalarFieldEnum[]
  }

  /**
   * Session.template
   */
  export type Session$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomScoreTemplate
     */
    select?: CustomScoreTemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomScoreTemplateInclude<ExtArgs> | null
    where?: CustomScoreTemplateWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model SessionPlayer
   */

  export type AggregateSessionPlayer = {
    _count: SessionPlayerCountAggregateOutputType | null
    _avg: SessionPlayerAvgAggregateOutputType | null
    _sum: SessionPlayerSumAggregateOutputType | null
    _min: SessionPlayerMinAggregateOutputType | null
    _max: SessionPlayerMaxAggregateOutputType | null
  }

  export type SessionPlayerAvgAggregateOutputType = {
    rawScore: number | null
    placement: number | null
    pointsAwarded: number | null
  }

  export type SessionPlayerSumAggregateOutputType = {
    rawScore: number | null
    placement: number | null
    pointsAwarded: number | null
  }

  export type SessionPlayerMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    rawScore: number | null
    placement: number | null
    pointsAwarded: number | null
    scoreDetails: string | null
  }

  export type SessionPlayerMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    rawScore: number | null
    placement: number | null
    pointsAwarded: number | null
    scoreDetails: string | null
  }

  export type SessionPlayerCountAggregateOutputType = {
    id: number
    sessionId: number
    userId: number
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails: number
    _all: number
  }


  export type SessionPlayerAvgAggregateInputType = {
    rawScore?: true
    placement?: true
    pointsAwarded?: true
  }

  export type SessionPlayerSumAggregateInputType = {
    rawScore?: true
    placement?: true
    pointsAwarded?: true
  }

  export type SessionPlayerMinAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    rawScore?: true
    placement?: true
    pointsAwarded?: true
    scoreDetails?: true
  }

  export type SessionPlayerMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    rawScore?: true
    placement?: true
    pointsAwarded?: true
    scoreDetails?: true
  }

  export type SessionPlayerCountAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    rawScore?: true
    placement?: true
    pointsAwarded?: true
    scoreDetails?: true
    _all?: true
  }

  export type SessionPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionPlayer to aggregate.
     */
    where?: SessionPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionPlayers to fetch.
     */
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionPlayers
    **/
    _count?: true | SessionPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionPlayerMaxAggregateInputType
  }

  export type GetSessionPlayerAggregateType<T extends SessionPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionPlayer[P]>
      : GetScalarType<T[P], AggregateSessionPlayer[P]>
  }




  export type SessionPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionPlayerWhereInput
    orderBy?: SessionPlayerOrderByWithAggregationInput | SessionPlayerOrderByWithAggregationInput[]
    by: SessionPlayerScalarFieldEnum[] | SessionPlayerScalarFieldEnum
    having?: SessionPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionPlayerCountAggregateInputType | true
    _avg?: SessionPlayerAvgAggregateInputType
    _sum?: SessionPlayerSumAggregateInputType
    _min?: SessionPlayerMinAggregateInputType
    _max?: SessionPlayerMaxAggregateInputType
  }

  export type SessionPlayerGroupByOutputType = {
    id: string
    sessionId: string
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails: string | null
    _count: SessionPlayerCountAggregateOutputType | null
    _avg: SessionPlayerAvgAggregateOutputType | null
    _sum: SessionPlayerSumAggregateOutputType | null
    _min: SessionPlayerMinAggregateOutputType | null
    _max: SessionPlayerMaxAggregateOutputType | null
  }

  type GetSessionPlayerGroupByPayload<T extends SessionPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], SessionPlayerGroupByOutputType[P]>
        }
      >
    >


  export type SessionPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    rawScore?: boolean
    placement?: boolean
    pointsAwarded?: boolean
    scoreDetails?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionPlayer"]>

  export type SessionPlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    rawScore?: boolean
    placement?: boolean
    pointsAwarded?: boolean
    scoreDetails?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionPlayer"]>

  export type SessionPlayerSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    rawScore?: boolean
    placement?: boolean
    pointsAwarded?: boolean
    scoreDetails?: boolean
  }

  export type SessionPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionPlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionPlayer"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      userId: string
      rawScore: number
      placement: number
      pointsAwarded: number
      scoreDetails: string | null
    }, ExtArgs["result"]["sessionPlayer"]>
    composites: {}
  }

  type SessionPlayerGetPayload<S extends boolean | null | undefined | SessionPlayerDefaultArgs> = $Result.GetResult<Prisma.$SessionPlayerPayload, S>

  type SessionPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionPlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionPlayerCountAggregateInputType | true
    }

  export interface SessionPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionPlayer'], meta: { name: 'SessionPlayer' } }
    /**
     * Find zero or one SessionPlayer that matches the filter.
     * @param {SessionPlayerFindUniqueArgs} args - Arguments to find a SessionPlayer
     * @example
     * // Get one SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionPlayerFindUniqueArgs>(args: SelectSubset<T, SessionPlayerFindUniqueArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SessionPlayer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionPlayerFindUniqueOrThrowArgs} args - Arguments to find a SessionPlayer
     * @example
     * // Get one SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SessionPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerFindFirstArgs} args - Arguments to find a SessionPlayer
     * @example
     * // Get one SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionPlayerFindFirstArgs>(args?: SelectSubset<T, SessionPlayerFindFirstArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SessionPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerFindFirstOrThrowArgs} args - Arguments to find a SessionPlayer
     * @example
     * // Get one SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SessionPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionPlayers
     * const sessionPlayers = await prisma.sessionPlayer.findMany()
     * 
     * // Get first 10 SessionPlayers
     * const sessionPlayers = await prisma.sessionPlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionPlayerWithIdOnly = await prisma.sessionPlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionPlayerFindManyArgs>(args?: SelectSubset<T, SessionPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SessionPlayer.
     * @param {SessionPlayerCreateArgs} args - Arguments to create a SessionPlayer.
     * @example
     * // Create one SessionPlayer
     * const SessionPlayer = await prisma.sessionPlayer.create({
     *   data: {
     *     // ... data to create a SessionPlayer
     *   }
     * })
     * 
     */
    create<T extends SessionPlayerCreateArgs>(args: SelectSubset<T, SessionPlayerCreateArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SessionPlayers.
     * @param {SessionPlayerCreateManyArgs} args - Arguments to create many SessionPlayers.
     * @example
     * // Create many SessionPlayers
     * const sessionPlayer = await prisma.sessionPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionPlayerCreateManyArgs>(args?: SelectSubset<T, SessionPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionPlayers and returns the data saved in the database.
     * @param {SessionPlayerCreateManyAndReturnArgs} args - Arguments to create many SessionPlayers.
     * @example
     * // Create many SessionPlayers
     * const sessionPlayer = await prisma.sessionPlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionPlayers and only return the `id`
     * const sessionPlayerWithIdOnly = await prisma.sessionPlayer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionPlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionPlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SessionPlayer.
     * @param {SessionPlayerDeleteArgs} args - Arguments to delete one SessionPlayer.
     * @example
     * // Delete one SessionPlayer
     * const SessionPlayer = await prisma.sessionPlayer.delete({
     *   where: {
     *     // ... filter to delete one SessionPlayer
     *   }
     * })
     * 
     */
    delete<T extends SessionPlayerDeleteArgs>(args: SelectSubset<T, SessionPlayerDeleteArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SessionPlayer.
     * @param {SessionPlayerUpdateArgs} args - Arguments to update one SessionPlayer.
     * @example
     * // Update one SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionPlayerUpdateArgs>(args: SelectSubset<T, SessionPlayerUpdateArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SessionPlayers.
     * @param {SessionPlayerDeleteManyArgs} args - Arguments to filter SessionPlayers to delete.
     * @example
     * // Delete a few SessionPlayers
     * const { count } = await prisma.sessionPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionPlayerDeleteManyArgs>(args?: SelectSubset<T, SessionPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionPlayers
     * const sessionPlayer = await prisma.sessionPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionPlayerUpdateManyArgs>(args: SelectSubset<T, SessionPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SessionPlayer.
     * @param {SessionPlayerUpsertArgs} args - Arguments to update or create a SessionPlayer.
     * @example
     * // Update or create a SessionPlayer
     * const sessionPlayer = await prisma.sessionPlayer.upsert({
     *   create: {
     *     // ... data to create a SessionPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionPlayer we want to update
     *   }
     * })
     */
    upsert<T extends SessionPlayerUpsertArgs>(args: SelectSubset<T, SessionPlayerUpsertArgs<ExtArgs>>): Prisma__SessionPlayerClient<$Result.GetResult<Prisma.$SessionPlayerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SessionPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerCountArgs} args - Arguments to filter SessionPlayers to count.
     * @example
     * // Count the number of SessionPlayers
     * const count = await prisma.sessionPlayer.count({
     *   where: {
     *     // ... the filter for the SessionPlayers we want to count
     *   }
     * })
    **/
    count<T extends SessionPlayerCountArgs>(
      args?: Subset<T, SessionPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionPlayerAggregateArgs>(args: Subset<T, SessionPlayerAggregateArgs>): Prisma.PrismaPromise<GetSessionPlayerAggregateType<T>>

    /**
     * Group by SessionPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionPlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionPlayerGroupByArgs['orderBy'] }
        : { orderBy?: SessionPlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionPlayer model
   */
  readonly fields: SessionPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SessionPlayer model
   */ 
  interface SessionPlayerFieldRefs {
    readonly id: FieldRef<"SessionPlayer", 'String'>
    readonly sessionId: FieldRef<"SessionPlayer", 'String'>
    readonly userId: FieldRef<"SessionPlayer", 'String'>
    readonly rawScore: FieldRef<"SessionPlayer", 'Float'>
    readonly placement: FieldRef<"SessionPlayer", 'Int'>
    readonly pointsAwarded: FieldRef<"SessionPlayer", 'Float'>
    readonly scoreDetails: FieldRef<"SessionPlayer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SessionPlayer findUnique
   */
  export type SessionPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter, which SessionPlayer to fetch.
     */
    where: SessionPlayerWhereUniqueInput
  }

  /**
   * SessionPlayer findUniqueOrThrow
   */
  export type SessionPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter, which SessionPlayer to fetch.
     */
    where: SessionPlayerWhereUniqueInput
  }

  /**
   * SessionPlayer findFirst
   */
  export type SessionPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter, which SessionPlayer to fetch.
     */
    where?: SessionPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionPlayers to fetch.
     */
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionPlayers.
     */
    cursor?: SessionPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionPlayers.
     */
    distinct?: SessionPlayerScalarFieldEnum | SessionPlayerScalarFieldEnum[]
  }

  /**
   * SessionPlayer findFirstOrThrow
   */
  export type SessionPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter, which SessionPlayer to fetch.
     */
    where?: SessionPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionPlayers to fetch.
     */
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionPlayers.
     */
    cursor?: SessionPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionPlayers.
     */
    distinct?: SessionPlayerScalarFieldEnum | SessionPlayerScalarFieldEnum[]
  }

  /**
   * SessionPlayer findMany
   */
  export type SessionPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter, which SessionPlayers to fetch.
     */
    where?: SessionPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionPlayers to fetch.
     */
    orderBy?: SessionPlayerOrderByWithRelationInput | SessionPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionPlayers.
     */
    cursor?: SessionPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionPlayers.
     */
    skip?: number
    distinct?: SessionPlayerScalarFieldEnum | SessionPlayerScalarFieldEnum[]
  }

  /**
   * SessionPlayer create
   */
  export type SessionPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionPlayer.
     */
    data: XOR<SessionPlayerCreateInput, SessionPlayerUncheckedCreateInput>
  }

  /**
   * SessionPlayer createMany
   */
  export type SessionPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionPlayers.
     */
    data: SessionPlayerCreateManyInput | SessionPlayerCreateManyInput[]
  }

  /**
   * SessionPlayer createManyAndReturn
   */
  export type SessionPlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SessionPlayers.
     */
    data: SessionPlayerCreateManyInput | SessionPlayerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SessionPlayer update
   */
  export type SessionPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionPlayer.
     */
    data: XOR<SessionPlayerUpdateInput, SessionPlayerUncheckedUpdateInput>
    /**
     * Choose, which SessionPlayer to update.
     */
    where: SessionPlayerWhereUniqueInput
  }

  /**
   * SessionPlayer updateMany
   */
  export type SessionPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionPlayers.
     */
    data: XOR<SessionPlayerUpdateManyMutationInput, SessionPlayerUncheckedUpdateManyInput>
    /**
     * Filter which SessionPlayers to update
     */
    where?: SessionPlayerWhereInput
  }

  /**
   * SessionPlayer upsert
   */
  export type SessionPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionPlayer to update in case it exists.
     */
    where: SessionPlayerWhereUniqueInput
    /**
     * In case the SessionPlayer found by the `where` argument doesn't exist, create a new SessionPlayer with this data.
     */
    create: XOR<SessionPlayerCreateInput, SessionPlayerUncheckedCreateInput>
    /**
     * In case the SessionPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionPlayerUpdateInput, SessionPlayerUncheckedUpdateInput>
  }

  /**
   * SessionPlayer delete
   */
  export type SessionPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
    /**
     * Filter which SessionPlayer to delete.
     */
    where: SessionPlayerWhereUniqueInput
  }

  /**
   * SessionPlayer deleteMany
   */
  export type SessionPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionPlayers to delete
     */
    where?: SessionPlayerWhereInput
  }

  /**
   * SessionPlayer without action
   */
  export type SessionPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionPlayer
     */
    select?: SessionPlayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionPlayerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    isGuest: 'isGuest'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const GroupMemberScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    userId: 'userId',
    role: 'role'
  };

  export type GroupMemberScalarFieldEnum = (typeof GroupMemberScalarFieldEnum)[keyof typeof GroupMemberScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const CustomScoreTemplateScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    name: 'name',
    fields: 'fields'
  };

  export type CustomScoreTemplateScalarFieldEnum = (typeof CustomScoreTemplateScalarFieldEnum)[keyof typeof CustomScoreTemplateScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    templateId: 'templateId',
    groupId: 'groupId',
    playedAt: 'playedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SessionPlayerScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    rawScore: 'rawScore',
    placement: 'placement',
    pointsAwarded: 'pointsAwarded',
    scoreDetails: 'scoreDetails'
  };

  export type SessionPlayerScalarFieldEnum = (typeof SessionPlayerScalarFieldEnum)[keyof typeof SessionPlayerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    isGuest?: BoolFilter<"User"> | boolean
    sessions?: SessionPlayerListRelationFilter
    groups?: GroupMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    sessions?: SessionPlayerOrderByRelationAggregateInput
    groups?: GroupMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    isGuest?: BoolFilter<"User"> | boolean
    sessions?: SessionPlayerListRelationFilter
    groups?: GroupMemberListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    isGuest?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    isGuest?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    members?: GroupMemberListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    members?: GroupMemberOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    name?: StringFilter<"Group"> | string
    members?: GroupMemberListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
  }

  export type GroupMemberWhereInput = {
    AND?: GroupMemberWhereInput | GroupMemberWhereInput[]
    OR?: GroupMemberWhereInput[]
    NOT?: GroupMemberWhereInput | GroupMemberWhereInput[]
    id?: StringFilter<"GroupMember"> | string
    groupId?: StringFilter<"GroupMember"> | string
    userId?: StringFilter<"GroupMember"> | string
    role?: StringFilter<"GroupMember"> | string
    group?: XOR<GroupRelationFilter, GroupWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GroupMemberOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    group?: GroupOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GroupMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupMemberWhereInput | GroupMemberWhereInput[]
    OR?: GroupMemberWhereInput[]
    NOT?: GroupMemberWhereInput | GroupMemberWhereInput[]
    groupId?: StringFilter<"GroupMember"> | string
    userId?: StringFilter<"GroupMember"> | string
    role?: StringFilter<"GroupMember"> | string
    group?: XOR<GroupRelationFilter, GroupWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GroupMemberOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    _count?: GroupMemberCountOrderByAggregateInput
    _max?: GroupMemberMaxOrderByAggregateInput
    _min?: GroupMemberMinOrderByAggregateInput
  }

  export type GroupMemberScalarWhereWithAggregatesInput = {
    AND?: GroupMemberScalarWhereWithAggregatesInput | GroupMemberScalarWhereWithAggregatesInput[]
    OR?: GroupMemberScalarWhereWithAggregatesInput[]
    NOT?: GroupMemberScalarWhereWithAggregatesInput | GroupMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GroupMember"> | string
    groupId?: StringWithAggregatesFilter<"GroupMember"> | string
    userId?: StringWithAggregatesFilter<"GroupMember"> | string
    role?: StringWithAggregatesFilter<"GroupMember"> | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    name?: StringFilter<"Game"> | string
    templates?: CustomScoreTemplateListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    templates?: CustomScoreTemplateOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    name?: StringFilter<"Game"> | string
    templates?: CustomScoreTemplateListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    name?: StringWithAggregatesFilter<"Game"> | string
  }

  export type CustomScoreTemplateWhereInput = {
    AND?: CustomScoreTemplateWhereInput | CustomScoreTemplateWhereInput[]
    OR?: CustomScoreTemplateWhereInput[]
    NOT?: CustomScoreTemplateWhereInput | CustomScoreTemplateWhereInput[]
    id?: StringFilter<"CustomScoreTemplate"> | string
    gameId?: StringFilter<"CustomScoreTemplate"> | string
    name?: StringFilter<"CustomScoreTemplate"> | string
    fields?: StringFilter<"CustomScoreTemplate"> | string
    game?: XOR<GameRelationFilter, GameWhereInput>
    sessions?: SessionListRelationFilter
  }

  export type CustomScoreTemplateOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    fields?: SortOrder
    game?: GameOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type CustomScoreTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomScoreTemplateWhereInput | CustomScoreTemplateWhereInput[]
    OR?: CustomScoreTemplateWhereInput[]
    NOT?: CustomScoreTemplateWhereInput | CustomScoreTemplateWhereInput[]
    gameId?: StringFilter<"CustomScoreTemplate"> | string
    name?: StringFilter<"CustomScoreTemplate"> | string
    fields?: StringFilter<"CustomScoreTemplate"> | string
    game?: XOR<GameRelationFilter, GameWhereInput>
    sessions?: SessionListRelationFilter
  }, "id">

  export type CustomScoreTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    fields?: SortOrder
    _count?: CustomScoreTemplateCountOrderByAggregateInput
    _max?: CustomScoreTemplateMaxOrderByAggregateInput
    _min?: CustomScoreTemplateMinOrderByAggregateInput
  }

  export type CustomScoreTemplateScalarWhereWithAggregatesInput = {
    AND?: CustomScoreTemplateScalarWhereWithAggregatesInput | CustomScoreTemplateScalarWhereWithAggregatesInput[]
    OR?: CustomScoreTemplateScalarWhereWithAggregatesInput[]
    NOT?: CustomScoreTemplateScalarWhereWithAggregatesInput | CustomScoreTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomScoreTemplate"> | string
    gameId?: StringWithAggregatesFilter<"CustomScoreTemplate"> | string
    name?: StringWithAggregatesFilter<"CustomScoreTemplate"> | string
    fields?: StringWithAggregatesFilter<"CustomScoreTemplate"> | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    gameId?: StringFilter<"Session"> | string
    templateId?: StringNullableFilter<"Session"> | string | null
    groupId?: StringFilter<"Session"> | string
    playedAt?: DateTimeFilter<"Session"> | Date | string
    players?: SessionPlayerListRelationFilter
    game?: XOR<GameRelationFilter, GameWhereInput>
    template?: XOR<CustomScoreTemplateNullableRelationFilter, CustomScoreTemplateWhereInput> | null
    group?: XOR<GroupRelationFilter, GroupWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    templateId?: SortOrderInput | SortOrder
    groupId?: SortOrder
    playedAt?: SortOrder
    players?: SessionPlayerOrderByRelationAggregateInput
    game?: GameOrderByWithRelationInput
    template?: CustomScoreTemplateOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    gameId?: StringFilter<"Session"> | string
    templateId?: StringNullableFilter<"Session"> | string | null
    groupId?: StringFilter<"Session"> | string
    playedAt?: DateTimeFilter<"Session"> | Date | string
    players?: SessionPlayerListRelationFilter
    game?: XOR<GameRelationFilter, GameWhereInput>
    template?: XOR<CustomScoreTemplateNullableRelationFilter, CustomScoreTemplateWhereInput> | null
    group?: XOR<GroupRelationFilter, GroupWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    templateId?: SortOrderInput | SortOrder
    groupId?: SortOrder
    playedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    gameId?: StringWithAggregatesFilter<"Session"> | string
    templateId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    groupId?: StringWithAggregatesFilter<"Session"> | string
    playedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type SessionPlayerWhereInput = {
    AND?: SessionPlayerWhereInput | SessionPlayerWhereInput[]
    OR?: SessionPlayerWhereInput[]
    NOT?: SessionPlayerWhereInput | SessionPlayerWhereInput[]
    id?: StringFilter<"SessionPlayer"> | string
    sessionId?: StringFilter<"SessionPlayer"> | string
    userId?: StringFilter<"SessionPlayer"> | string
    rawScore?: FloatFilter<"SessionPlayer"> | number
    placement?: IntFilter<"SessionPlayer"> | number
    pointsAwarded?: FloatFilter<"SessionPlayer"> | number
    scoreDetails?: StringNullableFilter<"SessionPlayer"> | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionPlayerOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    session?: SessionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SessionPlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionPlayerWhereInput | SessionPlayerWhereInput[]
    OR?: SessionPlayerWhereInput[]
    NOT?: SessionPlayerWhereInput | SessionPlayerWhereInput[]
    sessionId?: StringFilter<"SessionPlayer"> | string
    userId?: StringFilter<"SessionPlayer"> | string
    rawScore?: FloatFilter<"SessionPlayer"> | number
    placement?: IntFilter<"SessionPlayer"> | number
    pointsAwarded?: FloatFilter<"SessionPlayer"> | number
    scoreDetails?: StringNullableFilter<"SessionPlayer"> | string | null
    session?: XOR<SessionRelationFilter, SessionWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type SessionPlayerOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    _count?: SessionPlayerCountOrderByAggregateInput
    _avg?: SessionPlayerAvgOrderByAggregateInput
    _max?: SessionPlayerMaxOrderByAggregateInput
    _min?: SessionPlayerMinOrderByAggregateInput
    _sum?: SessionPlayerSumOrderByAggregateInput
  }

  export type SessionPlayerScalarWhereWithAggregatesInput = {
    AND?: SessionPlayerScalarWhereWithAggregatesInput | SessionPlayerScalarWhereWithAggregatesInput[]
    OR?: SessionPlayerScalarWhereWithAggregatesInput[]
    NOT?: SessionPlayerScalarWhereWithAggregatesInput | SessionPlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionPlayer"> | string
    sessionId?: StringWithAggregatesFilter<"SessionPlayer"> | string
    userId?: StringWithAggregatesFilter<"SessionPlayer"> | string
    rawScore?: FloatWithAggregatesFilter<"SessionPlayer"> | number
    placement?: IntWithAggregatesFilter<"SessionPlayer"> | number
    pointsAwarded?: FloatWithAggregatesFilter<"SessionPlayer"> | number
    scoreDetails?: StringNullableWithAggregatesFilter<"SessionPlayer"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    sessions?: SessionPlayerCreateNestedManyWithoutUserInput
    groups?: GroupMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    sessions?: SessionPlayerUncheckedCreateNestedManyWithoutUserInput
    groups?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionPlayerUpdateManyWithoutUserNestedInput
    groups?: GroupMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionPlayerUncheckedUpdateManyWithoutUserNestedInput
    groups?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
    sessions?: SessionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
    sessions?: SessionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
    sessions?: SessionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberCreateInput = {
    id?: string
    role: string
    group: GroupCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutGroupsInput
  }

  export type GroupMemberUncheckedCreateInput = {
    id?: string
    groupId: string
    userId: string
    role: string
  }

  export type GroupMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type GroupMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberCreateManyInput = {
    id?: string
    groupId: string
    userId: string
    role: string
  }

  export type GroupMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GameCreateInput = {
    id?: string
    name: string
    templates?: CustomScoreTemplateCreateNestedManyWithoutGameInput
    sessions?: SessionCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    name: string
    templates?: CustomScoreTemplateUncheckedCreateNestedManyWithoutGameInput
    sessions?: SessionUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: CustomScoreTemplateUpdateManyWithoutGameNestedInput
    sessions?: SessionUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: CustomScoreTemplateUncheckedUpdateManyWithoutGameNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: string
    name: string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CustomScoreTemplateCreateInput = {
    id?: string
    name: string
    fields: string
    game: GameCreateNestedOneWithoutTemplatesInput
    sessions?: SessionCreateNestedManyWithoutTemplateInput
  }

  export type CustomScoreTemplateUncheckedCreateInput = {
    id?: string
    gameId: string
    name: string
    fields: string
    sessions?: SessionUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type CustomScoreTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    game?: GameUpdateOneRequiredWithoutTemplatesNestedInput
    sessions?: SessionUpdateManyWithoutTemplateNestedInput
  }

  export type CustomScoreTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type CustomScoreTemplateCreateManyInput = {
    id?: string
    gameId: string
    name: string
    fields: string
  }

  export type CustomScoreTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
  }

  export type CustomScoreTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateInput = {
    id?: string
    playedAt?: Date | string
    players?: SessionPlayerCreateNestedManyWithoutSessionInput
    game: GameCreateNestedOneWithoutSessionsInput
    template?: CustomScoreTemplateCreateNestedOneWithoutSessionsInput
    group: GroupCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    gameId: string
    templateId?: string | null
    groupId: string
    playedAt?: Date | string
    players?: SessionPlayerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUpdateManyWithoutSessionNestedInput
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
    template?: CustomScoreTemplateUpdateOneWithoutSessionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    gameId: string
    templateId?: string | null
    groupId: string
    playedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionPlayerCreateInput = {
    id?: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
    session: SessionCreateNestedOneWithoutPlayersInput
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionPlayerUncheckedCreateInput = {
    id?: string
    sessionId: string
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type SessionPlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
    session?: SessionUpdateOneRequiredWithoutPlayersNestedInput
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionPlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionPlayerCreateManyInput = {
    id?: string
    sessionId: string
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type SessionPlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionPlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SessionPlayerListRelationFilter = {
    every?: SessionPlayerWhereInput
    some?: SessionPlayerWhereInput
    none?: SessionPlayerWhereInput
  }

  export type GroupMemberListRelationFilter = {
    every?: GroupMemberWhereInput
    some?: GroupMemberWhereInput
    none?: GroupMemberWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    isGuest?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    isGuest?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    isGuest?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GroupRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GroupMemberCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type GroupMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type GroupMemberMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type CustomScoreTemplateListRelationFilter = {
    every?: CustomScoreTemplateWhereInput
    some?: CustomScoreTemplateWhereInput
    none?: CustomScoreTemplateWhereInput
  }

  export type CustomScoreTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type CustomScoreTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    fields?: SortOrder
  }

  export type CustomScoreTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    fields?: SortOrder
  }

  export type CustomScoreTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    fields?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CustomScoreTemplateNullableRelationFilter = {
    is?: CustomScoreTemplateWhereInput | null
    isNot?: CustomScoreTemplateWhereInput | null
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    templateId?: SortOrder
    groupId?: SortOrder
    playedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    templateId?: SortOrder
    groupId?: SortOrder
    playedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    templateId?: SortOrder
    groupId?: SortOrder
    playedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SessionRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type SessionPlayerCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
    scoreDetails?: SortOrder
  }

  export type SessionPlayerAvgOrderByAggregateInput = {
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
  }

  export type SessionPlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
    scoreDetails?: SortOrder
  }

  export type SessionPlayerMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
    scoreDetails?: SortOrder
  }

  export type SessionPlayerSumOrderByAggregateInput = {
    rawScore?: SortOrder
    placement?: SortOrder
    pointsAwarded?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SessionPlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput> | SessionPlayerCreateWithoutUserInput[] | SessionPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutUserInput | SessionPlayerCreateOrConnectWithoutUserInput[]
    createMany?: SessionPlayerCreateManyUserInputEnvelope
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
  }

  export type GroupMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type SessionPlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput> | SessionPlayerCreateWithoutUserInput[] | SessionPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutUserInput | SessionPlayerCreateOrConnectWithoutUserInput[]
    createMany?: SessionPlayerCreateManyUserInputEnvelope
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
  }

  export type GroupMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SessionPlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput> | SessionPlayerCreateWithoutUserInput[] | SessionPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutUserInput | SessionPlayerCreateOrConnectWithoutUserInput[]
    upsert?: SessionPlayerUpsertWithWhereUniqueWithoutUserInput | SessionPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionPlayerCreateManyUserInputEnvelope
    set?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    disconnect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    delete?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    update?: SessionPlayerUpdateWithWhereUniqueWithoutUserInput | SessionPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionPlayerUpdateManyWithWhereWithoutUserInput | SessionPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
  }

  export type GroupMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutUserInput | GroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutUserInput | GroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutUserInput | GroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type SessionPlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput> | SessionPlayerCreateWithoutUserInput[] | SessionPlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutUserInput | SessionPlayerCreateOrConnectWithoutUserInput[]
    upsert?: SessionPlayerUpsertWithWhereUniqueWithoutUserInput | SessionPlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionPlayerCreateManyUserInputEnvelope
    set?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    disconnect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    delete?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    update?: SessionPlayerUpdateWithWhereUniqueWithoutUserInput | SessionPlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionPlayerUpdateManyWithWhereWithoutUserInput | SessionPlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
  }

  export type GroupMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput> | GroupMemberCreateWithoutUserInput[] | GroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutUserInput | GroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutUserInput | GroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupMemberCreateManyUserInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutUserInput | GroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutUserInput | GroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type GroupMemberCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutGroupInput = {
    create?: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput> | SessionCreateWithoutGroupInput[] | SessionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGroupInput | SessionCreateOrConnectWithoutGroupInput[]
    createMany?: SessionCreateManyGroupInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type GroupMemberUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput> | SessionCreateWithoutGroupInput[] | SessionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGroupInput | SessionCreateOrConnectWithoutGroupInput[]
    createMany?: SessionCreateManyGroupInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type GroupMemberUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutGroupInput | GroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutGroupInput | GroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutGroupInput | GroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutGroupNestedInput = {
    create?: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput> | SessionCreateWithoutGroupInput[] | SessionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGroupInput | SessionCreateOrConnectWithoutGroupInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGroupInput | SessionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: SessionCreateManyGroupInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGroupInput | SessionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGroupInput | SessionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type GroupMemberUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput> | GroupMemberCreateWithoutGroupInput[] | GroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupMemberCreateOrConnectWithoutGroupInput | GroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: GroupMemberUpsertWithWhereUniqueWithoutGroupInput | GroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupMemberCreateManyGroupInputEnvelope
    set?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    disconnect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    delete?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    connect?: GroupMemberWhereUniqueInput | GroupMemberWhereUniqueInput[]
    update?: GroupMemberUpdateWithWhereUniqueWithoutGroupInput | GroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupMemberUpdateManyWithWhereWithoutGroupInput | GroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput> | SessionCreateWithoutGroupInput[] | SessionUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGroupInput | SessionCreateOrConnectWithoutGroupInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGroupInput | SessionUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: SessionCreateManyGroupInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGroupInput | SessionUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGroupInput | SessionUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    connect?: GroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    upsert?: GroupUpsertWithoutMembersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutMembersInput, GroupUpdateWithoutMembersInput>, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    upsert?: UserUpsertWithoutGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupsInput, UserUpdateWithoutGroupsInput>, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type CustomScoreTemplateCreateNestedManyWithoutGameInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput> | CustomScoreTemplateCreateWithoutGameInput[] | CustomScoreTemplateUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutGameInput | CustomScoreTemplateCreateOrConnectWithoutGameInput[]
    createMany?: CustomScoreTemplateCreateManyGameInputEnvelope
    connect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutGameInput = {
    create?: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput> | SessionCreateWithoutGameInput[] | SessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGameInput | SessionCreateOrConnectWithoutGameInput[]
    createMany?: SessionCreateManyGameInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type CustomScoreTemplateUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput> | CustomScoreTemplateCreateWithoutGameInput[] | CustomScoreTemplateUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutGameInput | CustomScoreTemplateCreateOrConnectWithoutGameInput[]
    createMany?: CustomScoreTemplateCreateManyGameInputEnvelope
    connect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput> | SessionCreateWithoutGameInput[] | SessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGameInput | SessionCreateOrConnectWithoutGameInput[]
    createMany?: SessionCreateManyGameInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type CustomScoreTemplateUpdateManyWithoutGameNestedInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput> | CustomScoreTemplateCreateWithoutGameInput[] | CustomScoreTemplateUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutGameInput | CustomScoreTemplateCreateOrConnectWithoutGameInput[]
    upsert?: CustomScoreTemplateUpsertWithWhereUniqueWithoutGameInput | CustomScoreTemplateUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: CustomScoreTemplateCreateManyGameInputEnvelope
    set?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    disconnect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    delete?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    connect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    update?: CustomScoreTemplateUpdateWithWhereUniqueWithoutGameInput | CustomScoreTemplateUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: CustomScoreTemplateUpdateManyWithWhereWithoutGameInput | CustomScoreTemplateUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: CustomScoreTemplateScalarWhereInput | CustomScoreTemplateScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutGameNestedInput = {
    create?: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput> | SessionCreateWithoutGameInput[] | SessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGameInput | SessionCreateOrConnectWithoutGameInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGameInput | SessionUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: SessionCreateManyGameInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGameInput | SessionUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGameInput | SessionUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type CustomScoreTemplateUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput> | CustomScoreTemplateCreateWithoutGameInput[] | CustomScoreTemplateUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutGameInput | CustomScoreTemplateCreateOrConnectWithoutGameInput[]
    upsert?: CustomScoreTemplateUpsertWithWhereUniqueWithoutGameInput | CustomScoreTemplateUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: CustomScoreTemplateCreateManyGameInputEnvelope
    set?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    disconnect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    delete?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    connect?: CustomScoreTemplateWhereUniqueInput | CustomScoreTemplateWhereUniqueInput[]
    update?: CustomScoreTemplateUpdateWithWhereUniqueWithoutGameInput | CustomScoreTemplateUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: CustomScoreTemplateUpdateManyWithWhereWithoutGameInput | CustomScoreTemplateUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: CustomScoreTemplateScalarWhereInput | CustomScoreTemplateScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput> | SessionCreateWithoutGameInput[] | SessionUncheckedCreateWithoutGameInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGameInput | SessionCreateOrConnectWithoutGameInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGameInput | SessionUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: SessionCreateManyGameInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGameInput | SessionUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGameInput | SessionUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<GameCreateWithoutTemplatesInput, GameUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: GameCreateOrConnectWithoutTemplatesInput
    connect?: GameWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type GameUpdateOneRequiredWithoutTemplatesNestedInput = {
    create?: XOR<GameCreateWithoutTemplatesInput, GameUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: GameCreateOrConnectWithoutTemplatesInput
    upsert?: GameUpsertWithoutTemplatesInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutTemplatesInput, GameUpdateWithoutTemplatesInput>, GameUncheckedUpdateWithoutTemplatesInput>
  }

  export type SessionUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTemplateInput | SessionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTemplateInput | SessionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTemplateInput | SessionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTemplateInput | SessionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTemplateInput | SessionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTemplateInput | SessionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionPlayerCreateNestedManyWithoutSessionInput = {
    create?: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput> | SessionPlayerCreateWithoutSessionInput[] | SessionPlayerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutSessionInput | SessionPlayerCreateOrConnectWithoutSessionInput[]
    createMany?: SessionPlayerCreateManySessionInputEnvelope
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
  }

  export type GameCreateNestedOneWithoutSessionsInput = {
    create?: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GameCreateOrConnectWithoutSessionsInput
    connect?: GameWhereUniqueInput
  }

  export type CustomScoreTemplateCreateNestedOneWithoutSessionsInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutSessionsInput, CustomScoreTemplateUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutSessionsInput
    connect?: CustomScoreTemplateWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutSessionsInput = {
    create?: XOR<GroupCreateWithoutSessionsInput, GroupUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSessionsInput
    connect?: GroupWhereUniqueInput
  }

  export type SessionPlayerUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput> | SessionPlayerCreateWithoutSessionInput[] | SessionPlayerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutSessionInput | SessionPlayerCreateOrConnectWithoutSessionInput[]
    createMany?: SessionPlayerCreateManySessionInputEnvelope
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionPlayerUpdateManyWithoutSessionNestedInput = {
    create?: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput> | SessionPlayerCreateWithoutSessionInput[] | SessionPlayerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutSessionInput | SessionPlayerCreateOrConnectWithoutSessionInput[]
    upsert?: SessionPlayerUpsertWithWhereUniqueWithoutSessionInput | SessionPlayerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: SessionPlayerCreateManySessionInputEnvelope
    set?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    disconnect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    delete?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    update?: SessionPlayerUpdateWithWhereUniqueWithoutSessionInput | SessionPlayerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: SessionPlayerUpdateManyWithWhereWithoutSessionInput | SessionPlayerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
  }

  export type GameUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GameCreateOrConnectWithoutSessionsInput
    upsert?: GameUpsertWithoutSessionsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutSessionsInput, GameUpdateWithoutSessionsInput>, GameUncheckedUpdateWithoutSessionsInput>
  }

  export type CustomScoreTemplateUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<CustomScoreTemplateCreateWithoutSessionsInput, CustomScoreTemplateUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: CustomScoreTemplateCreateOrConnectWithoutSessionsInput
    upsert?: CustomScoreTemplateUpsertWithoutSessionsInput
    disconnect?: CustomScoreTemplateWhereInput | boolean
    delete?: CustomScoreTemplateWhereInput | boolean
    connect?: CustomScoreTemplateWhereUniqueInput
    update?: XOR<XOR<CustomScoreTemplateUpdateToOneWithWhereWithoutSessionsInput, CustomScoreTemplateUpdateWithoutSessionsInput>, CustomScoreTemplateUncheckedUpdateWithoutSessionsInput>
  }

  export type GroupUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<GroupCreateWithoutSessionsInput, GroupUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutSessionsInput
    upsert?: GroupUpsertWithoutSessionsInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutSessionsInput, GroupUpdateWithoutSessionsInput>, GroupUncheckedUpdateWithoutSessionsInput>
  }

  export type SessionPlayerUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput> | SessionPlayerCreateWithoutSessionInput[] | SessionPlayerUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: SessionPlayerCreateOrConnectWithoutSessionInput | SessionPlayerCreateOrConnectWithoutSessionInput[]
    upsert?: SessionPlayerUpsertWithWhereUniqueWithoutSessionInput | SessionPlayerUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: SessionPlayerCreateManySessionInputEnvelope
    set?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    disconnect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    delete?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    connect?: SessionPlayerWhereUniqueInput | SessionPlayerWhereUniqueInput[]
    update?: SessionPlayerUpdateWithWhereUniqueWithoutSessionInput | SessionPlayerUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: SessionPlayerUpdateManyWithWhereWithoutSessionInput | SessionPlayerUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutPlayersInput = {
    create?: XOR<SessionCreateWithoutPlayersInput, SessionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPlayersInput
    connect?: SessionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SessionUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<SessionCreateWithoutPlayersInput, SessionUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: SessionCreateOrConnectWithoutPlayersInput
    upsert?: SessionUpsertWithoutPlayersInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutPlayersInput, SessionUpdateWithoutPlayersInput>, SessionUncheckedUpdateWithoutPlayersInput>
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SessionPlayerCreateWithoutUserInput = {
    id?: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
    session: SessionCreateNestedOneWithoutPlayersInput
  }

  export type SessionPlayerUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type SessionPlayerCreateOrConnectWithoutUserInput = {
    where: SessionPlayerWhereUniqueInput
    create: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput>
  }

  export type SessionPlayerCreateManyUserInputEnvelope = {
    data: SessionPlayerCreateManyUserInput | SessionPlayerCreateManyUserInput[]
  }

  export type GroupMemberCreateWithoutUserInput = {
    id?: string
    role: string
    group: GroupCreateNestedOneWithoutMembersInput
  }

  export type GroupMemberUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    role: string
  }

  export type GroupMemberCreateOrConnectWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    create: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput>
  }

  export type GroupMemberCreateManyUserInputEnvelope = {
    data: GroupMemberCreateManyUserInput | GroupMemberCreateManyUserInput[]
  }

  export type SessionPlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionPlayerWhereUniqueInput
    update: XOR<SessionPlayerUpdateWithoutUserInput, SessionPlayerUncheckedUpdateWithoutUserInput>
    create: XOR<SessionPlayerCreateWithoutUserInput, SessionPlayerUncheckedCreateWithoutUserInput>
  }

  export type SessionPlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionPlayerWhereUniqueInput
    data: XOR<SessionPlayerUpdateWithoutUserInput, SessionPlayerUncheckedUpdateWithoutUserInput>
  }

  export type SessionPlayerUpdateManyWithWhereWithoutUserInput = {
    where: SessionPlayerScalarWhereInput
    data: XOR<SessionPlayerUpdateManyMutationInput, SessionPlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionPlayerScalarWhereInput = {
    AND?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
    OR?: SessionPlayerScalarWhereInput[]
    NOT?: SessionPlayerScalarWhereInput | SessionPlayerScalarWhereInput[]
    id?: StringFilter<"SessionPlayer"> | string
    sessionId?: StringFilter<"SessionPlayer"> | string
    userId?: StringFilter<"SessionPlayer"> | string
    rawScore?: FloatFilter<"SessionPlayer"> | number
    placement?: IntFilter<"SessionPlayer"> | number
    pointsAwarded?: FloatFilter<"SessionPlayer"> | number
    scoreDetails?: StringNullableFilter<"SessionPlayer"> | string | null
  }

  export type GroupMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    update: XOR<GroupMemberUpdateWithoutUserInput, GroupMemberUncheckedUpdateWithoutUserInput>
    create: XOR<GroupMemberCreateWithoutUserInput, GroupMemberUncheckedCreateWithoutUserInput>
  }

  export type GroupMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupMemberWhereUniqueInput
    data: XOR<GroupMemberUpdateWithoutUserInput, GroupMemberUncheckedUpdateWithoutUserInput>
  }

  export type GroupMemberUpdateManyWithWhereWithoutUserInput = {
    where: GroupMemberScalarWhereInput
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupMemberScalarWhereInput = {
    AND?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
    OR?: GroupMemberScalarWhereInput[]
    NOT?: GroupMemberScalarWhereInput | GroupMemberScalarWhereInput[]
    id?: StringFilter<"GroupMember"> | string
    groupId?: StringFilter<"GroupMember"> | string
    userId?: StringFilter<"GroupMember"> | string
    role?: StringFilter<"GroupMember"> | string
  }

  export type GroupMemberCreateWithoutGroupInput = {
    id?: string
    role: string
    user: UserCreateNestedOneWithoutGroupsInput
  }

  export type GroupMemberUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    role: string
  }

  export type GroupMemberCreateOrConnectWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    create: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type GroupMemberCreateManyGroupInputEnvelope = {
    data: GroupMemberCreateManyGroupInput | GroupMemberCreateManyGroupInput[]
  }

  export type SessionCreateWithoutGroupInput = {
    id?: string
    playedAt?: Date | string
    players?: SessionPlayerCreateNestedManyWithoutSessionInput
    game: GameCreateNestedOneWithoutSessionsInput
    template?: CustomScoreTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutGroupInput = {
    id?: string
    gameId: string
    templateId?: string | null
    playedAt?: Date | string
    players?: SessionPlayerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutGroupInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput>
  }

  export type SessionCreateManyGroupInputEnvelope = {
    data: SessionCreateManyGroupInput | SessionCreateManyGroupInput[]
  }

  export type GroupMemberUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    update: XOR<GroupMemberUpdateWithoutGroupInput, GroupMemberUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupMemberCreateWithoutGroupInput, GroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type GroupMemberUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupMemberWhereUniqueInput
    data: XOR<GroupMemberUpdateWithoutGroupInput, GroupMemberUncheckedUpdateWithoutGroupInput>
  }

  export type GroupMemberUpdateManyWithWhereWithoutGroupInput = {
    where: GroupMemberScalarWhereInput
    data: XOR<GroupMemberUpdateManyMutationInput, GroupMemberUncheckedUpdateManyWithoutGroupInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutGroupInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutGroupInput, SessionUncheckedUpdateWithoutGroupInput>
    create: XOR<SessionCreateWithoutGroupInput, SessionUncheckedCreateWithoutGroupInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutGroupInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutGroupInput, SessionUncheckedUpdateWithoutGroupInput>
  }

  export type SessionUpdateManyWithWhereWithoutGroupInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutGroupInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    gameId?: StringFilter<"Session"> | string
    templateId?: StringNullableFilter<"Session"> | string | null
    groupId?: StringFilter<"Session"> | string
    playedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type GroupCreateWithoutMembersInput = {
    id?: string
    name: string
    sessions?: SessionCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    sessions?: SessionUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutMembersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutGroupsInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    sessions?: SessionPlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupsInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    sessions?: SessionPlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type GroupUpsertWithoutMembersInput = {
    update: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type GroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type UserUpsertWithoutGroupsInput = {
    update: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionPlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionPlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CustomScoreTemplateCreateWithoutGameInput = {
    id?: string
    name: string
    fields: string
    sessions?: SessionCreateNestedManyWithoutTemplateInput
  }

  export type CustomScoreTemplateUncheckedCreateWithoutGameInput = {
    id?: string
    name: string
    fields: string
    sessions?: SessionUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type CustomScoreTemplateCreateOrConnectWithoutGameInput = {
    where: CustomScoreTemplateWhereUniqueInput
    create: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput>
  }

  export type CustomScoreTemplateCreateManyGameInputEnvelope = {
    data: CustomScoreTemplateCreateManyGameInput | CustomScoreTemplateCreateManyGameInput[]
  }

  export type SessionCreateWithoutGameInput = {
    id?: string
    playedAt?: Date | string
    players?: SessionPlayerCreateNestedManyWithoutSessionInput
    template?: CustomScoreTemplateCreateNestedOneWithoutSessionsInput
    group: GroupCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutGameInput = {
    id?: string
    templateId?: string | null
    groupId: string
    playedAt?: Date | string
    players?: SessionPlayerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutGameInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput>
  }

  export type SessionCreateManyGameInputEnvelope = {
    data: SessionCreateManyGameInput | SessionCreateManyGameInput[]
  }

  export type CustomScoreTemplateUpsertWithWhereUniqueWithoutGameInput = {
    where: CustomScoreTemplateWhereUniqueInput
    update: XOR<CustomScoreTemplateUpdateWithoutGameInput, CustomScoreTemplateUncheckedUpdateWithoutGameInput>
    create: XOR<CustomScoreTemplateCreateWithoutGameInput, CustomScoreTemplateUncheckedCreateWithoutGameInput>
  }

  export type CustomScoreTemplateUpdateWithWhereUniqueWithoutGameInput = {
    where: CustomScoreTemplateWhereUniqueInput
    data: XOR<CustomScoreTemplateUpdateWithoutGameInput, CustomScoreTemplateUncheckedUpdateWithoutGameInput>
  }

  export type CustomScoreTemplateUpdateManyWithWhereWithoutGameInput = {
    where: CustomScoreTemplateScalarWhereInput
    data: XOR<CustomScoreTemplateUpdateManyMutationInput, CustomScoreTemplateUncheckedUpdateManyWithoutGameInput>
  }

  export type CustomScoreTemplateScalarWhereInput = {
    AND?: CustomScoreTemplateScalarWhereInput | CustomScoreTemplateScalarWhereInput[]
    OR?: CustomScoreTemplateScalarWhereInput[]
    NOT?: CustomScoreTemplateScalarWhereInput | CustomScoreTemplateScalarWhereInput[]
    id?: StringFilter<"CustomScoreTemplate"> | string
    gameId?: StringFilter<"CustomScoreTemplate"> | string
    name?: StringFilter<"CustomScoreTemplate"> | string
    fields?: StringFilter<"CustomScoreTemplate"> | string
  }

  export type SessionUpsertWithWhereUniqueWithoutGameInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutGameInput, SessionUncheckedUpdateWithoutGameInput>
    create: XOR<SessionCreateWithoutGameInput, SessionUncheckedCreateWithoutGameInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutGameInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutGameInput, SessionUncheckedUpdateWithoutGameInput>
  }

  export type SessionUpdateManyWithWhereWithoutGameInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutGameInput>
  }

  export type GameCreateWithoutTemplatesInput = {
    id?: string
    name: string
    sessions?: SessionCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutTemplatesInput = {
    id?: string
    name: string
    sessions?: SessionUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutTemplatesInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutTemplatesInput, GameUncheckedCreateWithoutTemplatesInput>
  }

  export type SessionCreateWithoutTemplateInput = {
    id?: string
    playedAt?: Date | string
    players?: SessionPlayerCreateNestedManyWithoutSessionInput
    game: GameCreateNestedOneWithoutSessionsInput
    group: GroupCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutTemplateInput = {
    id?: string
    gameId: string
    groupId: string
    playedAt?: Date | string
    players?: SessionPlayerUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput>
  }

  export type SessionCreateManyTemplateInputEnvelope = {
    data: SessionCreateManyTemplateInput | SessionCreateManyTemplateInput[]
  }

  export type GameUpsertWithoutTemplatesInput = {
    update: XOR<GameUpdateWithoutTemplatesInput, GameUncheckedUpdateWithoutTemplatesInput>
    create: XOR<GameCreateWithoutTemplatesInput, GameUncheckedCreateWithoutTemplatesInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutTemplatesInput, GameUncheckedUpdateWithoutTemplatesInput>
  }

  export type GameUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutGameNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutTemplateInput, SessionUncheckedUpdateWithoutTemplateInput>
    create: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutTemplateInput, SessionUncheckedUpdateWithoutTemplateInput>
  }

  export type SessionUpdateManyWithWhereWithoutTemplateInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutTemplateInput>
  }

  export type SessionPlayerCreateWithoutSessionInput = {
    id?: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionPlayerUncheckedCreateWithoutSessionInput = {
    id?: string
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type SessionPlayerCreateOrConnectWithoutSessionInput = {
    where: SessionPlayerWhereUniqueInput
    create: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput>
  }

  export type SessionPlayerCreateManySessionInputEnvelope = {
    data: SessionPlayerCreateManySessionInput | SessionPlayerCreateManySessionInput[]
  }

  export type GameCreateWithoutSessionsInput = {
    id?: string
    name: string
    templates?: CustomScoreTemplateCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    templates?: CustomScoreTemplateUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutSessionsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
  }

  export type CustomScoreTemplateCreateWithoutSessionsInput = {
    id?: string
    name: string
    fields: string
    game: GameCreateNestedOneWithoutTemplatesInput
  }

  export type CustomScoreTemplateUncheckedCreateWithoutSessionsInput = {
    id?: string
    gameId: string
    name: string
    fields: string
  }

  export type CustomScoreTemplateCreateOrConnectWithoutSessionsInput = {
    where: CustomScoreTemplateWhereUniqueInput
    create: XOR<CustomScoreTemplateCreateWithoutSessionsInput, CustomScoreTemplateUncheckedCreateWithoutSessionsInput>
  }

  export type GroupCreateWithoutSessionsInput = {
    id?: string
    name: string
    members?: GroupMemberCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    members?: GroupMemberUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutSessionsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutSessionsInput, GroupUncheckedCreateWithoutSessionsInput>
  }

  export type SessionPlayerUpsertWithWhereUniqueWithoutSessionInput = {
    where: SessionPlayerWhereUniqueInput
    update: XOR<SessionPlayerUpdateWithoutSessionInput, SessionPlayerUncheckedUpdateWithoutSessionInput>
    create: XOR<SessionPlayerCreateWithoutSessionInput, SessionPlayerUncheckedCreateWithoutSessionInput>
  }

  export type SessionPlayerUpdateWithWhereUniqueWithoutSessionInput = {
    where: SessionPlayerWhereUniqueInput
    data: XOR<SessionPlayerUpdateWithoutSessionInput, SessionPlayerUncheckedUpdateWithoutSessionInput>
  }

  export type SessionPlayerUpdateManyWithWhereWithoutSessionInput = {
    where: SessionPlayerScalarWhereInput
    data: XOR<SessionPlayerUpdateManyMutationInput, SessionPlayerUncheckedUpdateManyWithoutSessionInput>
  }

  export type GameUpsertWithoutSessionsInput = {
    update: XOR<GameUpdateWithoutSessionsInput, GameUncheckedUpdateWithoutSessionsInput>
    create: XOR<GameCreateWithoutSessionsInput, GameUncheckedCreateWithoutSessionsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutSessionsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutSessionsInput, GameUncheckedUpdateWithoutSessionsInput>
  }

  export type GameUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: CustomScoreTemplateUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templates?: CustomScoreTemplateUncheckedUpdateManyWithoutGameNestedInput
  }

  export type CustomScoreTemplateUpsertWithoutSessionsInput = {
    update: XOR<CustomScoreTemplateUpdateWithoutSessionsInput, CustomScoreTemplateUncheckedUpdateWithoutSessionsInput>
    create: XOR<CustomScoreTemplateCreateWithoutSessionsInput, CustomScoreTemplateUncheckedCreateWithoutSessionsInput>
    where?: CustomScoreTemplateWhereInput
  }

  export type CustomScoreTemplateUpdateToOneWithWhereWithoutSessionsInput = {
    where?: CustomScoreTemplateWhereInput
    data: XOR<CustomScoreTemplateUpdateWithoutSessionsInput, CustomScoreTemplateUncheckedUpdateWithoutSessionsInput>
  }

  export type CustomScoreTemplateUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    game?: GameUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type CustomScoreTemplateUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
  }

  export type GroupUpsertWithoutSessionsInput = {
    update: XOR<GroupUpdateWithoutSessionsInput, GroupUncheckedUpdateWithoutSessionsInput>
    create: XOR<GroupCreateWithoutSessionsInput, GroupUncheckedCreateWithoutSessionsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutSessionsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutSessionsInput, GroupUncheckedUpdateWithoutSessionsInput>
  }

  export type GroupUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    members?: GroupMemberUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    members?: GroupMemberUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type SessionCreateWithoutPlayersInput = {
    id?: string
    playedAt?: Date | string
    game: GameCreateNestedOneWithoutSessionsInput
    template?: CustomScoreTemplateCreateNestedOneWithoutSessionsInput
    group: GroupCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutPlayersInput = {
    id?: string
    gameId: string
    templateId?: string | null
    groupId: string
    playedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutPlayersInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPlayersInput, SessionUncheckedCreateWithoutPlayersInput>
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    groups?: GroupMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email?: string | null
    isGuest?: boolean
    groups?: GroupMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type SessionUpsertWithoutPlayersInput = {
    update: XOR<SessionUpdateWithoutPlayersInput, SessionUncheckedUpdateWithoutPlayersInput>
    create: XOR<SessionCreateWithoutPlayersInput, SessionUncheckedCreateWithoutPlayersInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutPlayersInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutPlayersInput, SessionUncheckedUpdateWithoutPlayersInput>
  }

  export type SessionUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
    template?: CustomScoreTemplateUpdateOneWithoutSessionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    groups?: GroupMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isGuest?: BoolFieldUpdateOperationsInput | boolean
    groups?: GroupMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SessionPlayerCreateManyUserInput = {
    id?: string
    sessionId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type GroupMemberCreateManyUserInput = {
    id?: string
    groupId: string
    role: string
  }

  export type SessionPlayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
    session?: SessionUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type SessionPlayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionPlayerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberCreateManyGroupInput = {
    id?: string
    userId: string
    role: string
  }

  export type SessionCreateManyGroupInput = {
    id?: string
    gameId: string
    templateId?: string | null
    playedAt?: Date | string
  }

  export type GroupMemberUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type GroupMemberUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMemberUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type SessionUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUpdateManyWithoutSessionNestedInput
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
    template?: CustomScoreTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomScoreTemplateCreateManyGameInput = {
    id?: string
    name: string
    fields: string
  }

  export type SessionCreateManyGameInput = {
    id?: string
    templateId?: string | null
    groupId: string
    playedAt?: Date | string
  }

  export type CustomScoreTemplateUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutTemplateNestedInput
  }

  export type CustomScoreTemplateUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type CustomScoreTemplateUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fields?: StringFieldUpdateOperationsInput | string
  }

  export type SessionUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUpdateManyWithoutSessionNestedInput
    template?: CustomScoreTemplateUpdateOneWithoutSessionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyTemplateInput = {
    id?: string
    gameId: string
    groupId: string
    playedAt?: Date | string
  }

  export type SessionUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUpdateManyWithoutSessionNestedInput
    game?: GameUpdateOneRequiredWithoutSessionsNestedInput
    group?: GroupUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: SessionPlayerUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionPlayerCreateManySessionInput = {
    id?: string
    userId: string
    rawScore: number
    placement: number
    pointsAwarded: number
    scoreDetails?: string | null
  }

  export type SessionPlayerUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionPlayerUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionPlayerUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawScore?: FloatFieldUpdateOperationsInput | number
    placement?: IntFieldUpdateOperationsInput | number
    pointsAwarded?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GroupCountOutputTypeDefaultArgs instead
     */
    export type GroupCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GroupCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameCountOutputTypeDefaultArgs instead
     */
    export type GameCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomScoreTemplateCountOutputTypeDefaultArgs instead
     */
    export type CustomScoreTemplateCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomScoreTemplateCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GroupDefaultArgs instead
     */
    export type GroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GroupDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GroupMemberDefaultArgs instead
     */
    export type GroupMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GroupMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameDefaultArgs instead
     */
    export type GameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomScoreTemplateDefaultArgs instead
     */
    export type CustomScoreTemplateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomScoreTemplateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionPlayerDefaultArgs instead
     */
    export type SessionPlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionPlayerDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}