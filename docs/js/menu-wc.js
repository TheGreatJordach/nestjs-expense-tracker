"use strict";

customElements.define(
  "compodoc-menu",
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute("mode") === "normal";
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
                ${isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : ""}
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#modules-links"'
                                : 'data-bs-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"'}>
                            <li class="link">
                                <a href="modules/AppConfigurationModule.html" data-type="entity-link" >AppConfigurationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseManagerModule.html" data-type="entity-link" >ExpenseManagerModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExpenseModule.html" data-type="entity-link" >ExpenseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-ExpenseModule-90dcdcd230da3ac61f5b56203f8a2c1308fe1b4365152883421f9dbc277d626107d035a39debc9350e5044f0ab7b056eb0a5ca8d1ffdb6544f5ff1ffb450bf90"'
                                        : 'data-bs-target="#xs-injectables-links-module-ExpenseModule-90dcdcd230da3ac61f5b56203f8a2c1308fe1b4365152883421f9dbc277d626107d035a39debc9350e5044f0ab7b056eb0a5ca8d1ffdb6544f5ff1ffb450bf90"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-ExpenseModule-90dcdcd230da3ac61f5b56203f8a2c1308fe1b4365152883421f9dbc277d626107d035a39debc9350e5044f0ab7b056eb0a5ca8d1ffdb6544f5ff1ffb450bf90"'
                                        : 'id="xs-injectables-links-module-ExpenseModule-90dcdcd230da3ac61f5b56203f8a2c1308fe1b4365152883421f9dbc277d626107d035a39debc9350e5044f0ab7b056eb0a5ca8d1ffdb6544f5ff1ffb450bf90"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ExpenseManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpenseManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IamModule.html" data-type="entity-link" >IamModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-bs-target="#injectables-links-module-UserModule-d615414d37d0ec0172164891c10d596eb892188cc7b991958eb170e6a85ca790d1d80ae9ea3c639debecc1ae9fb0824dc255abc41918084c03443e2ba885d756"'
                                        : 'data-bs-target="#xs-injectables-links-module-UserModule-d615414d37d0ec0172164891c10d596eb892188cc7b991958eb170e6a85ca790d1d80ae9ea3c639debecc1ae9fb0824dc255abc41918084c03443e2ba885d756"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-UserModule-d615414d37d0ec0172164891c10d596eb892188cc7b991958eb170e6a85ca790d1d80ae9ea3c639debecc1ae9fb0824dc255abc41918084c03443e2ba885d756"'
                                        : 'id="xs-injectables-links-module-UserModule-d615414d37d0ec0172164891c10d596eb892188cc7b991958eb170e6a85ca790d1d80ae9ea3c639debecc1ae9fb0824dc255abc41918084c03443e2ba885d756"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/UserManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#entities-links"'
                                : 'data-bs-target="#xs-entities-links"'
                            }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"'}>
                                <li class="link">
                                    <a href="entities/Expense.html" data-type="entity-link" >Expense</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#classes-links"'
                            : 'data-bs-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"'}>
                            <li class="link">
                                <a href="classes/IdDto.html" data-type="entity-link" >IdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserBaseDto.html" data-type="entity-link" >UserBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateEnvironment.html" data-type="entity-link" >ValidateEnvironment</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                              isNormalMode
                                ? 'data-bs-target="#injectables-links"'
                                : 'data-bs-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"'}>
                                <li class="link">
                                    <a href="injectables/ExpenseManagerService.html" data-type="entity-link" >ExpenseManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserManagerService.html" data-type="entity-link" >UserManagerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${
                          isNormalMode
                            ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"'}>
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
  }
);
