<%--
  ~ Copyright Vladimir Zakharov
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~      http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  --%>

<h2><spring:message code="label.task"/>: ${title}. <spring:message code="task.${name}"/></h2>
<br>

<h4><spring:message code="label.description"/>: ${description.getMain()}
</h4>

<c:if test="${not empty description.getNote()}">
    <h5 class="note">
        <spring:message code="label.note"/>: ${description.getNote()}
    </h5>
</c:if>

<c:set var="motorsHint" value="${description.getMotorsHint()}"/>

<c:if test="${not empty motorsHint}">
    <div class="myTooltip textTooltip">
        <spring:message code="label.motors_position"/>
        <div>
            <span>${motorsHint}</span>
        </div>
    </div>
</c:if>

<c:set var="hint" value="${description.getHint()}"/>

<c:if test="${not empty hint}">
    <div class="myTooltip textTooltip">
        <spring:message code="label.hint"/>
        <div>
            <span>${hint}</span>
        </div>
    </div>
</c:if>

