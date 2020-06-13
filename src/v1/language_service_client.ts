// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';
import * as path from 'path';

import * as protos from '../../protos/protos';
import * as gapicConfig from './language_service_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Provides text analysis operations such as sentiment analysis and entity
 *  recognition.
 * @class
 * @memberof v1
 */
export class LanguageServiceClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  innerApiCalls: {[name: string]: Function};
  languageServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of LanguageServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof LanguageServiceClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;

    // users can override the config from client side, like retry codes name.
    // The detailed structure of the clientConfig can be found here: https://github.com/googleapis/gax-nodejs/blob/master/src/gax.ts#L546
    // The way to override client config for Showcase API:
    //
    // const customConfig = {"interfaces": {"google.showcase.v1beta1.Echo": {"methods": {"Echo": {"retry_codes_name": "idempotent", "retry_params_name": "default"}}}}}
    // const showcaseClient = new showcaseClient({ projectId, customConfig });
    opts.clientConfig = opts.clientConfig || {};

    // If we're running in browser, it's OK to omit `fallback` since
    // google-gax has `browser` field in its `package.json`.
    // For Electron (which does not respect `browser` field),
    // pass `{fallback: true}` to the LanguageServiceClient constructor.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof LanguageServiceClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../protos/protos.json')
        : nodejsProtoPath
    );

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.language.v1.LanguageService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.languageServiceStub) {
      return this.languageServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.language.v1.LanguageService.
    this.languageServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.language.v1.LanguageService'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.cloud.language.v1.LanguageService,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const languageServiceStubMethods = [
      'analyzeSentiment',
      'analyzeEntities',
      'analyzeEntitySentiment',
      'analyzeSyntax',
      'classifyText',
      'annotateText',
    ];
    for (const methodName of languageServiceStubMethods) {
      const callPromise = this.languageServiceStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        this.descriptors.page[methodName] ||
          this.descriptors.stream[methodName] ||
          this.descriptors.longrunning[methodName]
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.languageServiceStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'language.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'language.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-language',
      'https://www.googleapis.com/auth/cloud-platform',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  analyzeSentiment(
    request: protos.google.cloud.language.v1.IAnalyzeSentimentRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
      protos.google.cloud.language.v1.IAnalyzeSentimentRequest | undefined,
      {} | undefined
    ]
  >;
  analyzeSentiment(
    request: protos.google.cloud.language.v1.IAnalyzeSentimentRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeSentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  analyzeSentiment(
    request: protos.google.cloud.language.v1.IAnalyzeSentimentRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeSentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Analyzes the sentiment of the provided text.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {google.cloud.language.v1.EncodingType} request.encodingType
   *   The encoding type used by the API to calculate sentence offsets.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnalyzeSentimentResponse]{@link google.cloud.language.v1.AnalyzeSentimentResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  analyzeSentiment(
    request: protos.google.cloud.language.v1.IAnalyzeSentimentRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
          | protos.google.cloud.language.v1.IAnalyzeSentimentRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeSentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeSentimentResponse,
      protos.google.cloud.language.v1.IAnalyzeSentimentRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.analyzeSentiment(request, options, callback);
  }
  analyzeEntities(
    request: protos.google.cloud.language.v1.IAnalyzeEntitiesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
      protos.google.cloud.language.v1.IAnalyzeEntitiesRequest | undefined,
      {} | undefined
    ]
  >;
  analyzeEntities(
    request: protos.google.cloud.language.v1.IAnalyzeEntitiesRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitiesRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  analyzeEntities(
    request: protos.google.cloud.language.v1.IAnalyzeEntitiesRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitiesRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Finds named entities (currently proper names and common nouns) in the text
   * along with entity types, salience, mentions for each entity, and
   * other properties.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {google.cloud.language.v1.EncodingType} request.encodingType
   *   The encoding type used by the API to calculate offsets.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnalyzeEntitiesResponse]{@link google.cloud.language.v1.AnalyzeEntitiesResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  analyzeEntities(
    request: protos.google.cloud.language.v1.IAnalyzeEntitiesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
          | protos.google.cloud.language.v1.IAnalyzeEntitiesRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitiesRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeEntitiesResponse,
      protos.google.cloud.language.v1.IAnalyzeEntitiesRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.analyzeEntities(request, options, callback);
  }
  analyzeEntitySentiment(
    request: protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
      (
        | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  analyzeEntitySentiment(
    request: protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  analyzeEntitySentiment(
    request: protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Finds entities, similar to {@link google.cloud.language.v1.LanguageService.AnalyzeEntities|AnalyzeEntities} in the text and analyzes
   * sentiment associated with each entity and its mentions.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {google.cloud.language.v1.EncodingType} request.encodingType
   *   The encoding type used by the API to calculate offsets.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnalyzeEntitySentimentResponse]{@link google.cloud.language.v1.AnalyzeEntitySentimentResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  analyzeEntitySentiment(
    request: protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
          | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
      | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeEntitySentimentResponse,
      (
        | protos.google.cloud.language.v1.IAnalyzeEntitySentimentRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.analyzeEntitySentiment(
      request,
      options,
      callback
    );
  }
  analyzeSyntax(
    request: protos.google.cloud.language.v1.IAnalyzeSyntaxRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
      protos.google.cloud.language.v1.IAnalyzeSyntaxRequest | undefined,
      {} | undefined
    ]
  >;
  analyzeSyntax(
    request: protos.google.cloud.language.v1.IAnalyzeSyntaxRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
      protos.google.cloud.language.v1.IAnalyzeSyntaxRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  analyzeSyntax(
    request: protos.google.cloud.language.v1.IAnalyzeSyntaxRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
      protos.google.cloud.language.v1.IAnalyzeSyntaxRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Analyzes the syntax of the text and provides sentence boundaries and
   * tokenization along with part of speech tags, dependency trees, and other
   * properties.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {google.cloud.language.v1.EncodingType} request.encodingType
   *   The encoding type used by the API to calculate offsets.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnalyzeSyntaxResponse]{@link google.cloud.language.v1.AnalyzeSyntaxResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  analyzeSyntax(
    request: protos.google.cloud.language.v1.IAnalyzeSyntaxRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
          | protos.google.cloud.language.v1.IAnalyzeSyntaxRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
      protos.google.cloud.language.v1.IAnalyzeSyntaxRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnalyzeSyntaxResponse,
      protos.google.cloud.language.v1.IAnalyzeSyntaxRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.analyzeSyntax(request, options, callback);
  }
  classifyText(
    request: protos.google.cloud.language.v1.IClassifyTextRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IClassifyTextResponse,
      protos.google.cloud.language.v1.IClassifyTextRequest | undefined,
      {} | undefined
    ]
  >;
  classifyText(
    request: protos.google.cloud.language.v1.IClassifyTextRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IClassifyTextResponse,
      protos.google.cloud.language.v1.IClassifyTextRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  classifyText(
    request: protos.google.cloud.language.v1.IClassifyTextRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IClassifyTextResponse,
      protos.google.cloud.language.v1.IClassifyTextRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * Classifies a document into categories.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ClassifyTextResponse]{@link google.cloud.language.v1.ClassifyTextResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  classifyText(
    request: protos.google.cloud.language.v1.IClassifyTextRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IClassifyTextResponse,
          | protos.google.cloud.language.v1.IClassifyTextRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IClassifyTextResponse,
      protos.google.cloud.language.v1.IClassifyTextRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IClassifyTextResponse,
      protos.google.cloud.language.v1.IClassifyTextRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.classifyText(request, options, callback);
  }
  annotateText(
    request: protos.google.cloud.language.v1.IAnnotateTextRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnnotateTextResponse,
      protos.google.cloud.language.v1.IAnnotateTextRequest | undefined,
      {} | undefined
    ]
  >;
  annotateText(
    request: protos.google.cloud.language.v1.IAnnotateTextRequest,
    options: gax.CallOptions,
    callback: Callback<
      protos.google.cloud.language.v1.IAnnotateTextResponse,
      protos.google.cloud.language.v1.IAnnotateTextRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  annotateText(
    request: protos.google.cloud.language.v1.IAnnotateTextRequest,
    callback: Callback<
      protos.google.cloud.language.v1.IAnnotateTextResponse,
      protos.google.cloud.language.v1.IAnnotateTextRequest | null | undefined,
      {} | null | undefined
    >
  ): void;
  /**
   * A convenience method that provides all the features that analyzeSentiment,
   * analyzeEntities, and analyzeSyntax provide in one call.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.language.v1.Document} request.document
   *   Input document.
   * @param {google.cloud.language.v1.AnnotateTextRequest.Features} request.features
   *   The enabled features.
   * @param {google.cloud.language.v1.EncodingType} request.encodingType
   *   The encoding type used by the API to calculate offsets.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnnotateTextResponse]{@link google.cloud.language.v1.AnnotateTextResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  annotateText(
    request: protos.google.cloud.language.v1.IAnnotateTextRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protos.google.cloud.language.v1.IAnnotateTextResponse,
          | protos.google.cloud.language.v1.IAnnotateTextRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.cloud.language.v1.IAnnotateTextResponse,
      protos.google.cloud.language.v1.IAnnotateTextRequest | null | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.cloud.language.v1.IAnnotateTextResponse,
      protos.google.cloud.language.v1.IAnnotateTextRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    this.initialize();
    return this.innerApiCalls.annotateText(request, options, callback);
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.languageServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
