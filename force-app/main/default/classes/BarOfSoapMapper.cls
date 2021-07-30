public with sharing class BarOfSoapMapper {

    public String soapName, barType, scent,color, baseType, ID,  moldStyle;
    Integer count;

    public BarOfSoap__c getRecord() {

        return new BarOfSoap__c(
            ExternalId__c = id,
            Name = soapName,
            barType__c = barType,
            scent__c = scent,
            color__c = color,
            baseType__c = baseType,
            count__c = count,
            moldStyle__c = moldStyle
        );
    }

}
