'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-expense-tracker documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigurationModule.html" data-type="entity-link" >AppConfigurationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseModule.html" data-type="entity-link" >ExpenseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExpenseModule-29bdafac4b3cb5270c3d680dc031b775ef975619ec739b12b16e25b400354d3965aadc72e47d011565ce354fec26956cf10e3779497b41224edd9cfed7bd05f1"' : 'data-bs-target="#xs-injectables-links-module-ExpenseModule-29bdafac4b3cb5270c3d680dc031b775ef975619ec739b12b16e25b400354d3965aadc72e47d011565ce354fec26956cf10e3779497b41224edd9cfed7bd05f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpenseModule-29bdafac4b3cb5270c3d680dc031b775ef975619ec739b12b16e25b400354d3965aadc72e47d011565ce354fec26956cf10e3779497b41224edd9cfed7bd05f1"' :
                                        'id="xs-injectables-links-module-ExpenseModule-29bdafac4b3cb5270c3d680dc031b775ef975619ec739b12b16e25b400354d3965aadc72e47d011565ce354fec26956cf10e3779497b41224edd9cfed7bd05f1"' }>
                                        <li class="link">
                                            <a href="injectables/ExpenseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseTrackerModule.html" data-type="entity-link" >ExpenseTrackerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExpenseTrackerModule-2354380f6f030cb1b18be4ba65e99c6f4dd14acd9a55e9b83b79747145f7180a3756f8d05cba0e2f5f820a3fc2f8ba1c0cf409527289303f597821b582528ecf"' : 'data-bs-target="#xs-injectables-links-module-ExpenseTrackerModule-2354380f6f030cb1b18be4ba65e99c6f4dd14acd9a55e9b83b79747145f7180a3756f8d05cba0e2f5f820a3fc2f8ba1c0cf409527289303f597821b582528ecf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExpenseTrackerModule-2354380f6f030cb1b18be4ba65e99c6f4dd14acd9a55e9b83b79747145f7180a3756f8d05cba0e2f5f820a3fc2f8ba1c0cf409527289303f597821b582528ecf"' :
                                        'id="xs-injectables-links-module-ExpenseTrackerModule-2354380f6f030cb1b18be4ba65e99c6f4dd14acd9a55e9b83b79747145f7180a3756f8d05cba0e2f5f820a3fc2f8ba1c0cf409527289303f597821b582528ecf"' }>
                                        <li class="link">
                                            <a href="injectables/ExpenseTrackerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseTrackerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' : 'data-bs-target="#xs-controllers-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' :
                                            'id="xs-controllers-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' : 'data-bs-target="#xs-injectables-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' :
                                        'id="xs-injectables-links-module-IamModule-da57e983fecbec298be9254d2f129cc28842786f85d76a45378c367131af0b74113ef971e3366a1fbc7d20ad7d2c329306e1043674951acae5a20da032637f20"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordModule.html" data-type="entity-link" >PasswordModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PasswordModule-e79e06659442227e629a0c9fc67f05f7f395a5cab401e1874402b1f7d32528decc40a7c5f91716e064efd6038816718156bc67be4d01d08aa93c1a69e18f8df7"' : 'data-bs-target="#xs-injectables-links-module-PasswordModule-e79e06659442227e629a0c9fc67f05f7f395a5cab401e1874402b1f7d32528decc40a7c5f91716e064efd6038816718156bc67be4d01d08aa93c1a69e18f8df7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PasswordModule-e79e06659442227e629a0c9fc67f05f7f395a5cab401e1874402b1f7d32528decc40a7c5f91716e064efd6038816718156bc67be4d01d08aa93c1a69e18f8df7"' :
                                        'id="xs-injectables-links-module-PasswordModule-e79e06659442227e629a0c9fc67f05f7f395a5cab401e1874402b1f7d32528decc40a7c5f91716e064efd6038816718156bc67be4d01d08aa93c1a69e18f8df7"' }>
                                        <li class="link">
                                            <a href="injectables/PasswordProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-a690d61df1f4ee789d70b6830059a00906236bf5fa3bcd790afa094351378d13b0f3b6d0e8617281e05f15f8bb688abc0272d1e4f55de94a8869961df530c423"' : 'data-bs-target="#xs-injectables-links-module-UserModule-a690d61df1f4ee789d70b6830059a00906236bf5fa3bcd790afa094351378d13b0f3b6d0e8617281e05f15f8bb688abc0272d1e4f55de94a8869961df530c423"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-a690d61df1f4ee789d70b6830059a00906236bf5fa3bcd790afa094351378d13b0f3b6d0e8617281e05f15f8bb688abc0272d1e4f55de94a8869961df530c423"' :
                                        'id="xs-injectables-links-module-UserModule-a690d61df1f4ee789d70b6830059a00906236bf5fa3bcd790afa094351378d13b0f3b6d0e8617281e05f15f8bb688abc0272d1e4f55de94a8869961df530c423"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Expense.html" data-type="entity-link" >Expense</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BcryptAlgorithmProvider.html" data-type="entity-link" >BcryptAlgorithmProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublicUserDto.html" data-type="entity-link" >PublicUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserBaseDto.html" data-type="entity-link" >UserBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateEnvVariables.html" data-type="entity-link" >ValidateEnvVariables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpenseService.html" data-type="entity-link" >ExpenseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExpenseTrackerService.html" data-type="entity-link" >ExpenseTrackerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordProvider.html" data-type="entity-link" >PasswordProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IHash.html" data-type="entity-link" >IHash</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});