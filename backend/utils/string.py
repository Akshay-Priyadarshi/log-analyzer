from typing import Any

from jinja2 import Template


class StringUtils:
    """Utility class for string operations.

    Provides static methods for manipulating and formatting strings,
    such as populating template variables.
    """

    def populate_variables(
        self,template_text: str, variables: dict[str, Any] = None
    ) -> str:
        if variables is None:
            variables = {}
        try:
            # logger.debug({'TEMPLATE_TEXT': template_text})
            # logger.debug({'TEMPLATE_VARIABLES': {**variables}})
            template = Template(template_text)
            populated_template = template.render(**variables)
            print(
                'populated template successfully',
               {'populated_template': populated_template},
            )
            return populated_template
        except Exception as e:
            raise Exception(
                f"""
                unable to populate template
                {template_text}
                with variables
                {variables}
                """
            ) from e
