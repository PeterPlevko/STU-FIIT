from django.db import models


class BulletinIssues(models.Model):
    year = models.IntegerField()
    number = models.IntegerField()
    published_at = models.DateTimeField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'bulletin_issues'
        unique_together = (('updated_at', 'id'), ('year', 'number'),)


class Companies(models.Model):
    cin = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=10000, blank=True, null=True)
    br_section = models.CharField(max_length=10000, blank=True, null=True)
    address_line = models.CharField(max_length=10000, blank=True, null=True)
    last_update = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'companies'


class KonkurzRestrukturalizaciaActors(models.Model):
    corporate_body_name = models.CharField(max_length=10000, blank=True, null=True)
    cin = models.BigIntegerField(blank=True, null=True)
    street = models.CharField(max_length=10000, blank=True, null=True)
    building_number = models.CharField(max_length=10000, blank=True, null=True)
    city = models.CharField(max_length=10000, blank=True, null=True)
    postal_code = models.CharField(max_length=10000, blank=True, null=True)
    country = models.CharField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    company = models.ForeignKey(Companies, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        db_table = 'konkurz_restrukturalizacia_actors'


class KonkurzRestrukturalizaciaIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, models.DO_NOTHING)
    raw_issue = models.OneToOneField('RawIssues', models.DO_NOTHING)
    court_name = models.CharField(max_length=10000)
    file_reference = models.CharField(max_length=10000)
    ics = models.CharField(max_length=10000)
    released_by = models.CharField(max_length=10000)
    releaser_position = models.CharField(max_length=10000, blank=True, null=True)
    sent_by = models.CharField(max_length=10000, blank=True, null=True)
    released_date = models.DateField()
    debtor = models.ForeignKey(KonkurzRestrukturalizaciaActors, models.DO_NOTHING, blank=True, null=True)
    kind = models.CharField(max_length=10000)
    heading = models.TextField(blank=True, null=True)
    decision = models.TextField(blank=True, null=True)
    announcement = models.TextField(blank=True, null=True)
    advice = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'konkurz_restrukturalizacia_issues'
        unique_together = (('updated_at', 'id'),)


class KonkurzRestrukturalizaciaProposings(models.Model):
    issue = models.ForeignKey(KonkurzRestrukturalizaciaIssues, models.DO_NOTHING)
    actor = models.ForeignKey(KonkurzRestrukturalizaciaActors, models.DO_NOTHING)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'konkurz_restrukturalizacia_proposings'


class KonkurzVyrovnanieIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, models.DO_NOTHING)
    raw_issue = models.OneToOneField('RawIssues', models.DO_NOTHING)
    court_code = models.CharField(max_length=10000)
    court_name = models.CharField(max_length=10000)
    file_reference = models.CharField(max_length=10000)
    corporate_body_name = models.CharField(max_length=10000)
    cin = models.BigIntegerField(blank=True, null=True)
    street = models.CharField(max_length=10000, blank=True, null=True)
    building_number = models.CharField(max_length=10000, blank=True, null=True)
    city = models.CharField(max_length=10000, blank=True, null=True)
    postal_code = models.CharField(max_length=10000, blank=True, null=True)
    country = models.CharField(max_length=10000, blank=True, null=True)
    kind_code = models.CharField(max_length=10000)
    kind_name = models.CharField(max_length=10000)
    announcement = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    company = models.ForeignKey(Companies, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        db_table = 'konkurz_vyrovnanie_issues'
        unique_together = (('updated_at', 'id'),)


class LikvidatorIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, models.DO_NOTHING)
    raw_issue = models.OneToOneField('RawIssues', models.DO_NOTHING)
    legal_form_code = models.CharField(max_length=10000)
    legal_form_name = models.CharField(max_length=10000)
    corporate_body_name = models.CharField(max_length=10000)
    cin = models.BigIntegerField()
    sid = models.CharField(max_length=10000, blank=True, null=True)
    street = models.CharField(max_length=10000)
    building_number = models.CharField(max_length=10000)
    city = models.CharField(max_length=10000)
    postal_code = models.CharField(max_length=10000)
    country = models.CharField(max_length=10000)
    in_business_register = models.BooleanField()
    br_insertion = models.CharField(max_length=10000, blank=True, null=True)
    br_court_code = models.CharField(max_length=10000, blank=True, null=True)
    br_court_name = models.CharField(max_length=10000, blank=True, null=True)
    br_section = models.CharField(max_length=10000, blank=True, null=True)
    other_registrar_name = models.CharField(max_length=10000, blank=True, null=True)
    other_registration_number = models.CharField(max_length=10000, blank=True, null=True)
    decision_based_on = models.CharField(max_length=10000)
    decision_date = models.DateField()
    claim_term = models.CharField(max_length=10000)
    liquidation_start_date = models.DateField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    debtee_legal_form_code = models.CharField(max_length=10000, blank=True, null=True)
    debtee_legal_form_name = models.CharField(max_length=10000, blank=True, null=True)
    company = models.ForeignKey(Companies, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        db_table = 'likvidator_issues'
        unique_together = (('updated_at', 'id'),)


class OrPodanieIssueDocuments(models.Model):
    or_podanie_issue = models.ForeignKey('OrPodanieIssues', models.DO_NOTHING)
    name = models.CharField(max_length=10000)
    delivery_date = models.DateField()
    ruz_deposit_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'or_podanie_issue_documents'


class OrPodanieIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, on_delete=models.RESTRICT)
    raw_issue = models.ForeignKey('RawIssues', on_delete=models.RESTRICT)
    br_mark = models.CharField(max_length=10000)
    br_court_code = models.CharField(max_length=10000)
    br_court_name = models.CharField(max_length=10000)
    kind_code = models.CharField(max_length=10000)
    kind_name = models.CharField(max_length=10000)
    cin = models.BigIntegerField(blank=True, null=True)
    registration_date = models.DateField(blank=True, null=True)
    corporate_body_name = models.CharField(max_length=10000, blank=True, null=True)
    br_section = models.CharField(max_length=10000)
    br_insertion = models.CharField(max_length=10000)
    text = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    address_line = models.CharField(max_length=10000, blank=True, null=True)
    street = models.CharField(max_length=10000, blank=True, null=True)
    postal_code = models.CharField(max_length=10000, blank=True, null=True)
    city = models.CharField(max_length=10000, blank=True, null=True)
    company = models.ForeignKey(Companies, on_delete=models.RESTRICT, blank=True, null=True)

    class Meta:
        db_table = 'or_podanie_issues'
        unique_together = (('updated_at', 'id'),)


class RawIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, on_delete=models.RESTRICT)
    file_name = models.CharField(max_length=10000)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'raw_issues'
        unique_together = (('updated_at', 'id'),)


class ZnizenieImaniaCeos(models.Model):
    znizenie_imania_issue = models.ForeignKey('ZnizenieImaniaIssues', models.DO_NOTHING)
    prefixes = models.CharField(max_length=10000, blank=True, null=True)
    postfixes = models.CharField(max_length=10000, blank=True, null=True)
    given_name = models.CharField(max_length=10000, blank=True, null=True)
    family_name = models.CharField(max_length=10000, blank=True, null=True)
    street = models.CharField(max_length=10000, blank=True, null=True)
    building_number = models.CharField(max_length=10000, blank=True, null=True)
    postal_code = models.CharField(max_length=10000, blank=True, null=True)
    city = models.CharField(max_length=10000, blank=True, null=True)
    country = models.CharField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = 'znizenie_imania_ceos'


class ZnizenieImaniaIssues(models.Model):
    bulletin_issue = models.ForeignKey(BulletinIssues, models.DO_NOTHING)
    raw_issue = models.OneToOneField(RawIssues, models.DO_NOTHING)
    corporate_body_name = models.CharField(max_length=10000)
    street = models.CharField(max_length=10000, blank=True, null=True)
    building_number = models.CharField(max_length=10000, blank=True, null=True)
    postal_code = models.CharField(max_length=10000, blank=True, null=True)
    city = models.CharField(max_length=10000, blank=True, null=True)
    country = models.CharField(max_length=10000, blank=True, null=True)
    br_court_code = models.CharField(max_length=10000)
    br_court_name = models.CharField(max_length=10000)
    br_section = models.CharField(max_length=10000)
    br_insertion = models.CharField(max_length=10000)
    cin = models.BigIntegerField()
    decision_text = models.TextField(blank=True, null=True)
    decision_date = models.DateField(blank=True, null=True)
    equity_currency_code = models.CharField(max_length=10000)
    old_equity_value = models.DecimalField(max_digits=12, decimal_places=2)
    new_equity_value = models.DecimalField(max_digits=12, decimal_places=2)
    resolution_store_date = models.DateField(blank=True, null=True)
    first_ov_released_date = models.DateField(blank=True, null=True)
    first_ov_released_number = models.CharField(max_length=10000, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    company = models.ForeignKey(Companies, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        db_table = 'znizenie_imania_issues'
        unique_together = (('updated_at', 'id'),)
