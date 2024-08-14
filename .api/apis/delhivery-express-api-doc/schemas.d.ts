declare const Testinput2: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["phone", "city", "name", "pin", "address", "country", "email", "registered_name", "return_address", "return_pin", "return_city", "return_state", "return_country"];
        readonly properties: {
            readonly phone: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Associated phone number in Numeric or in Masking format with the warehouse</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["phone no."];
            };
            readonly city: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">City of the pickup location</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["Kota"];
            };
            readonly name: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Name of the warehouse with which the warehouse gets created in delhivery system</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["warehouse name"];
            };
            readonly pin: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Pin code of the pickup location</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["324005"];
            };
            readonly address: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Associated pickup location address</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["address"];
            };
            readonly country: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Country associated</p>";
                readonly default: "optional";
                readonly examples: readonly ["India"];
            };
            readonly email: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Associated email address</p>";
                readonly default: "mandatory";
                readonly examples: readonly ["abc@gmail.com"];
            };
            readonly registered_name: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Ideally this name should be same as the name mentioned in the above field</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["registered username"];
            };
            readonly return_address: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Address where shipment need to be returned</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["return_address"];
            };
            readonly return_pin: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Return Pin Code</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["return_pin"];
            };
            readonly return_city: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">City where shipment need to be returned</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["return_city"];
            };
            readonly return_state: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">State of the Return location</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["return_state"];
            };
            readonly return_country: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Country where shipment need to be returned</p>";
                readonly default: "Mandatory";
                readonly examples: readonly ["return_country"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Authorization: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Token XXXXXXXXXXXXXX";
                };
                readonly "Content-Type": {
                    readonly type: "string";
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "This is the format in which data is being sent (JSON is recommended)";
                };
                readonly Accept: {
                    readonly type: "string";
                    readonly default: "application/json";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "application/json";
                };
            };
            readonly required: readonly ["Authorization", "Content-Type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly working_hours: {};
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["warehouse name"];
                        };
                        readonly pincode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [324005];
                        };
                        readonly type_of_clientwarehouse: {};
                        readonly phone: {
                            readonly type: "string";
                            readonly examples: readonly ["phone no."];
                        };
                        readonly client: {
                            readonly type: "string";
                            readonly examples: readonly ["Client name"];
                        };
                        readonly address: {
                            readonly type: "string";
                            readonly examples: readonly ["address"];
                        };
                        readonly active: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["A new client warehouse has been created in HQ(Delhivery)."];
                        };
                        readonly largest_vehicle_constraint: {};
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Registered Name should not contain '_' underscore."];
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Phone number should be Integer"];
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Pincode doesn't exist in system"];
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const Testinput6: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["name", "pin"];
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Registered warehouse name in our system</p>";
                readonly examples: readonly ["clwh-name"];
            };
            readonly registered_name: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Registered warehouse name in our system</p>";
                readonly examples: readonly ["name"];
            };
            readonly address: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Registered address of the warehouse in our system</p>";
                readonly examples: readonly ["123, sector 40 Gurgaon"];
            };
            readonly pin: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Registered pincode of the warehouse in our system</p>";
                readonly examples: readonly ["456010"];
            };
            readonly phone: {
                readonly type: "string";
                readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">Registered pincode for the warehouse in our system</p>";
                readonly examples: readonly ["8888888888"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Authorization: {
                    readonly type: "string";
                    readonly default: "Token api-token-key";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">This is the API Key, refer to the Authentication section to get a valid token or use a different validation method.</p>";
                };
                readonly "Content-Type": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "<p style=\"font-size:15px;font-family:Lato, proxima-nova, Helvetica Neue, Arial, sans-serif;color: #001a00;text-align:justify;\">This is the format in which data is being sent (json is recommended)</p>";
                };
            };
            readonly required: readonly ["Authorization", "Content-Type"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly phone: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [3242526423737];
                        };
                        readonly working_hours: {
                            readonly type: "object";
                            readonly properties: {};
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["myWH1234"];
                        };
                        readonly address: {
                            readonly type: "string";
                            readonly examples: readonly ["kanpur"];
                        };
                        readonly active: {
                            readonly type: "boolean";
                            readonly default: true;
                            readonly examples: readonly [true];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly examples: readonly ["client warehouse has been updated in HQ(Delhivery)."];
                        };
                        readonly largest_vehicle_constraint: {};
                        readonly pincode: {
                            readonly type: "integer";
                            readonly default: 0;
                            readonly examples: readonly [122413];
                        };
                        readonly type_of_clientwarehouse: {};
                    };
                };
                readonly success: {
                    readonly type: "boolean";
                    readonly default: true;
                    readonly examples: readonly [true];
                };
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly [""];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["myWH123"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["ClientWarehouse 'myWH123' doesn't exist"];
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Registered Name should not contain '_' underscore."];
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Phone number should be Integer"];
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly data: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly examples: readonly ["xxxxxxxxxxx"];
                            };
                        };
                    };
                    readonly success: {
                        readonly type: "boolean";
                        readonly default: true;
                        readonly examples: readonly [false];
                    };
                    readonly error: {
                        readonly type: "string";
                        readonly examples: readonly ["Pincode doesn't exist in system"];
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "415": {
            readonly type: "object";
            readonly properties: {
                readonly detail: {
                    readonly type: "string";
                    readonly examples: readonly ["Unsupported media type 'xml' in request."];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { Testinput2, Testinput6 };
